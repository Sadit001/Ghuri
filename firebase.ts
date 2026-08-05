import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged
} from 'firebase/auth';
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';

// Default config that is overridden by EXPO_PUBLIC variables if present
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || ""
};

// Check if we have valid-looking Firebase credentials (non-empty and not placeholders)
const hasRealFirebase = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "__FIREBASE_API_KEY__" &&
  !firebaseConfig.apiKey.includes("Dummy") &&
  !firebaseConfig.apiKey.includes("Placeholder")
);

let app: any = null;
let auth: any = null;
let db: any = null;

if (hasRealFirebase) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    // Initialize Auth with ReactNative persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    db = getFirestore(app);
    console.log("Firebase initialized successfully in real cloud mode.");
  } catch (error) {
    console.warn("Failed to initialize real Firebase, falling back to mock mode:", error);
    app = null;
    auth = null;
    db = null;
  }
} else {
  console.log("No Firebase API key provided in environment. Running in mock offline mode (AsyncStorage).");
}

// User Profile interfaces
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  contactNumber: string;
  gender: 'Male' | 'Female';
  documentType?: 'NID' | 'Passport';
  documentFront?: string; // local image uri
  documentBack?: string; // local image uri
  memberSince: string;
}

// Local mock database keys for AsyncStorage
const MOCK_USERS_KEY = '@ghuri_mock_users';
const CURRENT_USER_KEY = '@ghuri_current_user';
const MOCK_PROFILES_KEY = '@ghuri_mock_profiles';

// Mock Auth Implementation using AsyncStorage
const mockAuth = {
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem(MOCK_USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : {};
    
    const lowerEmail = email.trim().toLowerCase();
    if (users[lowerEmail]) {
      throw { code: 'auth/email-already-in-use', message: 'This email is already registered.' };
    }
    
    const uid = 'mock-uid-' + Math.random().toString(36).substring(2, 9);
    users[lowerEmail] = { uid, email, password };
    await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    
    const mockUser = { uid, email };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockUser));
    return { user: mockUser };
  },

  signInWithEmailAndPassword: async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem(MOCK_USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : {};
    
    const lowerEmail = email.trim().toLowerCase();
    const user = users[lowerEmail];
    
    if (!user || user.password !== password) {
      throw { code: 'auth/invalid-credential', message: 'Invalid email or password.' };
    }
    
    const mockUser = { uid: user.uid, email: user.email };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockUser));
    return { user: mockUser };
  },

  signOut: async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }
};

const mockFirestore = {
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const profilesJson = await AsyncStorage.getItem(MOCK_PROFILES_KEY);
    const profiles = profilesJson ? JSON.parse(profilesJson) : {};
    return profiles[uid] || null;
  },

  setUserProfile: async (uid: string, profile: UserProfile): Promise<void> => {
    const profilesJson = await AsyncStorage.getItem(MOCK_PROFILES_KEY);
    const profiles = profilesJson ? JSON.parse(profilesJson) : {};
    profiles[uid] = profile;
    await AsyncStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(profiles));
  }
};

/**
 * Register a new user account and store their profile details.
 */
export const registerUser = async (
  profileData: Omit<UserProfile, 'uid' | 'memberSince'>, 
  password: string,
  isBangla: boolean = false
): Promise<UserProfile> => {
  const email = profileData.email.trim();
  const today = new Date();
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsBn = ['জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  
  const memberSince = isBangla 
    ? `${monthsBn[today.getMonth()]} ${today.getFullYear().toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)])}`
    : `${monthsEn[today.getMonth()]} ${today.getFullYear()}`;

  if (app && auth && db) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      const newProfile: UserProfile = {
        ...profileData,
        uid,
        memberSince,
        // Replace undefined optional fields with null — Firestore rejects undefined
        documentType: profileData.documentType ?? null,
        documentFront: profileData.documentFront ?? null,
        documentBack: profileData.documentBack ?? null,
      };
      
      // Final safety: strip any remaining undefined values (Firestore does not accept them)
      const cleanProfile = JSON.parse(JSON.stringify(newProfile));
      
      await setDoc(doc(db, 'users', uid), cleanProfile);
      return newProfile;
    } catch (error: any) {
      console.error("Firebase registration error:", error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(isBangla ? "এই ইমেলটি ইতিমধ্যে নিবন্ধিত।" : "This email is already registered.");
      }
      throw new Error(error.message || "Registration failed.");
    }
  } else {
    // Local AsyncStorage Mock Mode
    try {
      const { user } = await mockAuth.createUserWithEmailAndPassword(email, password);
      const newProfile: UserProfile = {
        ...profileData,
        uid: user.uid,
        memberSince
      };
      await mockFirestore.setUserProfile(user.uid, newProfile);
      return newProfile;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(isBangla ? "এই ইমেলটি ইতিমধ্যে নিবন্ধিত।" : "This email is already registered.");
      }
      throw new Error(error.message || "Registration failed.");
    }
  }
};

/**
 * Log in a user.
 */
export const loginUser = async (email: string, password: string, isBangla: boolean = false): Promise<UserProfile> => {
  const trimmedEmail = email.trim();
  if (app && auth && db) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const uid = userCredential.user.uid;
      
      const docSnap = await getDoc(doc(db, 'users', uid));
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        const today = new Date();
        const memberSince = isBangla
          ? `জুলাই ${today.getFullYear().toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)])}`
          : `July ${today.getFullYear()}`;
        const defaultProfile: UserProfile = {
          uid,
          name: trimmedEmail.split('@')[0],
          email: trimmedEmail,
          contactNumber: '01712345678',
          gender: 'Male',
          memberSince
        };
        await setDoc(doc(db, 'users', uid), defaultProfile);
        return defaultProfile;
      }
    } catch (error: any) {
      console.error("Firebase login error:", error);
      throw new Error(isBangla ? "ইমেল বা পাসওয়ার্ড ভুল। আবার চেষ্টা করুন।" : "Invalid email or password. Please try again.");
    }
  } else {
    // Local AsyncStorage Mock Mode
    try {
      const { user } = await mockAuth.signInWithEmailAndPassword(trimmedEmail, password);
      const profile = await mockFirestore.getUserProfile(user.uid);
      if (!profile) {
        throw new Error(isBangla ? "ব্যবহারকারীর প্রোফাইল খুঁজে পাওয়া যায়নি।" : "User profile not found.");
      }
      return profile;
    } catch (error: any) {
      throw new Error(isBangla ? "ইমেল বা পাসওয়ার্ড ভুল। আবার চেষ্টা করুন।" : "Invalid email or password. Please try again.");
    }
  }
};

/**
 * Log out the user.
 */
export const logoutUser = async (): Promise<void> => {
  if (app && auth) {
    await fbSignOut(auth);
  } else {
    await mockAuth.signOut();
  }
};

/**
 * Subscribe to authentication state changes.
 */
export const subscribeToAuthChanges = (
  onUserLoaded: (profile: UserProfile | null) => void,
  isBangla: boolean = false
) => {
  if (app && auth && db) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (docSnap.exists()) {
            onUserLoaded(docSnap.data() as UserProfile);
          } else {
            onUserLoaded(null);
          }
        } catch (error) {
          console.error("Error subscribing to Auth Changes profile fetch:", error);
          onUserLoaded(null);
        }
      } else {
        onUserLoaded(null);
      }
    });
  } else {
    let active = true;
    const checkMockSession = async () => {
      try {
        const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (active) {
          if (userJson) {
            const mockUser = JSON.parse(userJson);
            const profile = await mockFirestore.getUserProfile(mockUser.uid);
            onUserLoaded(profile);
          } else {
            onUserLoaded(null);
          }
        }
      } catch {
        if (active) onUserLoaded(null);
      }
    };
    checkMockSession();
    return () => {
      active = false;
    };
  }
};

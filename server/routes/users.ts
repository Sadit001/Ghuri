import { Response } from "express";
import { getDb } from "../firebase";
import { AuthRequest } from "../middleware/auth";

/**
 * POST /api/users/register
 * 
 * Called by the frontend AFTER Firebase Authentication creates the user.
 * This route saves the user's profile (name, phone, etc.) into Firestore.
 */
export const handleRegisterUser = async (req: AuthRequest, res: Response) => {
  try {
    // req.user.uid comes from our Security Checkpoint (auth middleware)
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const { name, email, contactNumber, gender, memberSince } = req.body;

    // Save the user profile to the 'users' collection in Firestore
    // The document ID is set to the user's Firebase uid — very important!
    await getDb().collection("users").doc(uid).set({
      uid,
      name,
      email,
      contactNumber,
      gender,
      memberSince,
      createdAt: new Date().toISOString(),
    });

    console.log(`✅ New user profile saved to Firestore: ${uid}`);
    return res.status(201).json({ message: "User registered successfully.", uid });

  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    return res.status(500).json({ error: "Failed to save user profile." });
  }
};

/**
 * GET /api/users/me
 * 
 * Returns the logged-in user's profile from Firestore.
 */
export const handleGetMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    // Fetch the user document from the 'users' collection
    const userDoc = await getDb().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found." });
    }

    return res.status(200).json(userDoc.data());

  } catch (error) {
    console.error("Error fetching user from Firestore:", error);
    return res.status(500).json({ error: "Failed to fetch user profile." });
  }
};

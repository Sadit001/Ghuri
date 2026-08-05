import * as admin from 'firebase-admin';
import { env } from './env';

let dbInstance: any = null;
let isRealFirebase = false;

// In-Memory Storage Adapter for Mock Firestore Mode
class InMemoryFirestore {
  private collections: Map<string, Map<string, any>> = new Map();

  private getCollectionMap(collectionName: string): Map<string, any> {
    if (!this.collections.has(collectionName)) {
      this.collections.set(collectionName, new Map());
    }
    return this.collections.get(collectionName)!;
  }

  collection(collectionName: string) {
    const colMap = this.getCollectionMap(collectionName);
    return {
      doc: (id?: string) => {
        const docId = id || 'doc_' + Math.random().toString(36).substring(2, 9);
        return {
          id: docId,
          get: async () => {
            const data = colMap.get(docId);
            return {
              exists: !!data,
              id: docId,
              data: () => data,
            };
          },
          set: async (data: any, options?: { merge?: boolean }) => {
            if (options?.merge && colMap.has(docId)) {
              colMap.set(docId, { ...colMap.get(docId), ...data });
            } else {
              colMap.set(docId, { ...data, id: docId });
            }
          },
          update: async (data: any) => {
            const existing = colMap.get(docId) || {};
            colMap.set(docId, { ...existing, ...data });
          },
          delete: async () => {
            colMap.delete(docId);
          },
        };
      },
      add: async (data: any) => {
        const docId = 'doc_' + Math.random().toString(36).substring(2, 9);
        colMap.set(docId, { ...data, id: docId });
        return { id: docId };
      },
      get: async () => {
        const docs = Array.from(colMap.entries()).map(([id, data]) => ({
          id,
          exists: true,
          data: () => data,
        }));
        return { docs };
      },
      where: (field: string, op: string, value: any) => {
        return {
          get: async () => {
            const docs = Array.from(colMap.entries())
              .filter(([_, data]) => {
                if (op === '==') return data[field] === value;
                if (op === 'array-contains') return Array.isArray(data[field]) && data[field].includes(value);
                if (op === 'in') return Array.isArray(value) && value.includes(data[field]);
                return true;
              })
              .map(([id, data]) => ({
                id,
                exists: true,
                data: () => data,
              }));
            return { docs };
          },
        };
      },
    };
  }
}

try {
  if (env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY,
      }),
    });
    dbInstance = admin.firestore();
    isRealFirebase = true;
    console.log('Firebase Admin SDK initialized successfully with Cloud Firestore.');
  } else {
    console.log('No Firebase credentials found in .env. Initializing high-performance InMemory Firestore mode.');
    dbInstance = new InMemoryFirestore();
  }
} catch (error) {
  console.warn('Fallback to InMemory Firestore mode due to initialization error:', error);
  dbInstance = new InMemoryFirestore();
}

export const db = dbInstance;
export const isCloudFirebase = () => isRealFirebase;

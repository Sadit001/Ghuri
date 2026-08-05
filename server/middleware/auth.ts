import { Request, Response, NextFunction } from "express";
import { getAdminAuth } from "../firebase";

// Extend Express Request to include the verified user info
export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

/**
 * Security Checkpoint Middleware.
 * 
 * Think of this as the BOUNCER at the door.
 * Every request that comes in must show a valid Firebase Token (VIP Wristband).
 * If the token is valid, we stamp the request with the user's uid and let it through.
 * If not, we immediately reject it with a 401 Unauthorized error.
 */
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the token from the request header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  // 2. Extract the token (remove "Bearer " from the front)
  const token = authHeader.split("Bearer ")[1];

  try {
    // 3. Ask Firebase to verify the token is real and not expired
    const decodedToken = await getAdminAuth().verifyIdToken(token);

    // 4. Stamp the request with the user's info so routes can use it
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    // 5. All good! Let the request continue to the route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
  }
};

import adminDetails from '../config/firebase.js';


export const authenticate = async (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await adminDetails.auth().verifyIdToken(token);
    req.user = {
     ...decodedToken,
     userId: decodedToken.uid 
    };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
}

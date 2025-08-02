const User = require('../model/user.js'); // ✅ correct


exports.protect = async (req, res, next) => {
  try {
    //  const auth = await req.auth(); // ✅ new Clerk method
  const {userId }= req.auth()

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in protect middleware",
    });
  }
};

import jwt from 'jsonwebtoken';

// Middleware to authenticate user
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Set userId on request object
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const cookie = req.cookies;
  
  try {
    if (cookie) {
      const token = cookie.token;
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized", authorized: false });
    }
  } catch (e) {
    console.log(e);
    res
      .status(401)
      .json({ message: "Unauthorized", error: e, authorized: false });
  }
};

module.exports = auth;
// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Failed to authenticate token' });

//     req.userId = decoded.id;  // يمكنك استخدام هذا في المعالجات الأخرى إذا لزم الأمر
//     next();
//   });
// };

// module.exports = auth;

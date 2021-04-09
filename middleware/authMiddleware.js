// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     if (!req.headers.authorization) return res.status(401).send("unauthorized");

//     const {userId}=jwt.verify(req.headers.authorization, process.env.jwtSecret);

//     req.userId=userId
//     next()
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send("unauthorized");
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send(`Unauthorized`);
    }

    const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send(`Unauthorized`);
  }
};
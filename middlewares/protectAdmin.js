//if the user is connected and type admin next()
const protectAdmin = (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.type === "admin") {
    next();
  } else {
    console.log("req.session.currentUser :", req.session.currentUser);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = protectAdmin;

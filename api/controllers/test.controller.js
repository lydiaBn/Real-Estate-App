import jwt from "jsonwebtoken";

export const shouldBeloggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are authenticated" });
};

export const shouldBeAdmin = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid !" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "You are not authorized !" });
    }
  });
  res.status(200).json({ message: "You are authenticated" });
  res.send("the get api route works!");
};

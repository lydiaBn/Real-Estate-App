import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js"; // Import PrismaClient from @prisma/client
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    ///HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //CREATE NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(req.body);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //CHECK IF USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //CHECK IF PASSWORD IS CORRECT
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //GENERATE COOKIE TOKEN AND SEND IT TO THE USER

    //res.setHeader("Set-Cookie", "test=" + "myValue").json("successeful login");

    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    const token = jwt.sign(
      { userId: user.id, username: user.username, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

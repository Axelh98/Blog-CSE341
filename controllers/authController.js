const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password && !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.redirect("/posts");

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { loginUser };

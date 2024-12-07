const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");    
// Iniciar autenticación con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback después de autenticación
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirige después de login exitoso
  }
);


// Login
router.post("/login", authController.loginUser);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

module.exports = router;

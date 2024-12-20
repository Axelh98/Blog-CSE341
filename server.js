require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
// Routes Required
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("./config/passport");
const blogRoutes = require("./routes/blogRoutes");  
const commentRoutes = require("./routes/commentsRoutes");
const path = require("path");
// Swagger
const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // swagger-jsdoc output

const session = require("express-session");

// App setup
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Middleware para datos del formulario
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(session({
  secret: "your_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));

app.use(passport.initialize());
app.use(passport.session());

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ENDPOINT FOR SWAGGER 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes ! ! ! ! 
// Routes ! ! ! ! 
app.get("/", (req, res) => {
  res.render("login");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", blogRoutes);
app.use("/comments", commentRoutes);
//app.use("/api/tags", require("./routes/tagRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`));


module.exports = app;
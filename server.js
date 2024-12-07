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



const session = require("express-session");


// App setup
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// Passport middleware
app.use(session({
  secret: "your_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", blogRoutes);
//app.use("/api/comments", require("./routes/commentRoutes"));
//app.use("/api/tags", require("./routes/tagRoutes"));

// Swagger Docs
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Management API",
      version: "1.0.0",
      description: "API for managing blogs and comments",
    },
  },
  apis: ["./routes/*.js"], // Documentation in route files
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

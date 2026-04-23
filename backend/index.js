require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const DBConnection = require("./config/connect");
const path = require("path");

const app = express();

// Ensure uploads directory exists (needed for multer uploads)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

////// connection of DB /////////
DBConnection();

const PORT = process.env.PORT || 5000;

////// middleware /////////
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/// ROUTES ///
app.use("/api/admin", require("./routers/adminRoutes"));
app.use("/api/user", require("./routers/userRoutes"));

// Start server with automatic port fallback when the default port is in use
const startServer = (port, retries = 3) => {
  port = Number(port); // Ensure port is a number
  if (port < 1 || port > 65535) {
    console.error(`Invalid port: ${port}. Port must be between 1 and 65535.`);
    process.exit(1);
  }

  const server = app.listen(port, () => console.log(`running on ${port}`));

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      if (retries > 0) {
        const nextPort = port + 1;
        if (nextPort > 65535) {
          console.error("No free port found below 65536. Please set a different PORT in .env.");
          process.exit(1);
        }
        console.warn(`Port ${port} is in use, trying ${nextPort}...`);
        startServer(nextPort, retries - 1);
      } else {
        console.error(
          `Port ${port} is already in use and auto-retry failed. ` +
            `Please stop the other process or set PORT to a free port in your .env file.`
        );
        process.exit(1);
      }
    } else {
      throw err;
    }
  });
};

startServer(PORT);
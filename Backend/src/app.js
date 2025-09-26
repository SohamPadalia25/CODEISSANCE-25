import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import donorRoutes from './routes/donor.routes.js'
import emergencyRoutes from "./routes/emergency.routes.js";



const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";

//emergency SOS
app.use("/api/emergency", emergencyRoutes);

// Health check route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running!",
        timestamp: new Date().toISOString()
    });
});

//donor 
app.use("/api/donor",donorRoutes);
// Routes declaration
app.use("/api/v1/users", userRouter);

// 404 handler for unmatched routes - Express 5.x compatible
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    console.error("Error:", {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });
    
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

export default app;
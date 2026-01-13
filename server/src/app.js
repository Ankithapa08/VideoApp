import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/dashboard.routes.js";


const app = express();
app.use(express.static("public"));

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
app.use("/api/v1/dashboard", dashboardRoutes);

//routes import
import userRouter from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos", videoRoutes);


export {app}
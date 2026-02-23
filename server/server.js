import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import detailRoutes from "./routes/details.js";
dotenv.config();

const app=express()

app.use(cors({
  origin: ["https://connect-space-git-main-hinal-patels-projects.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())
app.use("/api/details",detailRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MONGODB connected"))
.catch(err=> console.log(err))

app.use("/api/auth",authRoutes);

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log("server is running on port 5000"))
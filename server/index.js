import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import multer from "multer"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { register, login, createPost, getFeedPosts, getUserPosts, likePost, getUser } from "./controllers/controllers.js"


// Initializing Express
const app = express()
const PORT = 8080

app.listen (
    PORT,
    () => console.log("it's alive")
)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the environment file
dotenv.config();

// JSON middlware - converting results into json
app.use( express.json() )
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//middlware for origin access
app.use(cors())

// Connection to the MongoDB database
if (mongoose.connect(process.env.MONGO_URL)) {
    console.log("Connected to DB")
}

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

// REGISTER Route
app.post("/auth/register", upload.single("picture"), register)

// LOGIN Route
app.post('/auth/login', (req, res) => {
    login(req, res)
})

// GET USER Route
app.get('/users/:id', (req, res) => {
    getUser(req, res)
})

// CREATE POST Route
app.post("/posts", upload.single("picture"), createPost)

// GET ALL POSTS Route
app.get('/posts', (req, res) => {
    getFeedPosts(req, res)
})

// GET USER POSTS Route
app.get('/:userId/posts', (req, res) => {
    getUserPosts(req, res)
})

// UPDATE POST likes Route
app.patch('/posts/:id/like', (req, res) => {
    likePost(req, res)
})
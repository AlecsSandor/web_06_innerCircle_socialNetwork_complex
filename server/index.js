import express from 'express'
import mongoose from 'mongoose' // to handle connections to MongoDb
import dotenv from 'dotenv' // to enable environment variables
import multer from 'multer' // to handle file uploads
import cors from 'cors' // to handle access
import path from 'path'
import * as http from 'http'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { fileURLToPath } from 'url'
import {
  register,
  login,
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  getUser,
} from './controllers/controllers.js' // importing all actions for the different routes

// Initializing Express
const app = express()

// Middlware for origin access
app.use(cors())
const PORT = 8080

// Start the server
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log('server running')
})

// Socket.io server ---------------------------------- This is used for the group chat feature
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
  },
})

// Check for every new connection to the server
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('send_message', async (data) => {
    // Check to see if the client is calling for ChatGpt (using the prefix /gpt/ in the message body)
    if (data.message.includes('/gpt/')) {
      // Send the client message to all clients
      socket.broadcast.emit('receive_message', data)
      data.message = data.message.replace('/gpt/', '')
      await processMessageToChatGPT(data.message).then((data) => {
        let processedData = {
          picturePath: 'gpt.jpg',
          author: 'ChatGPT',
          message: data,
        }
        // Send the ChatGpt reponse to client
        io.emit('receive_message', processedData)
      })
    } else {
      // Send the client message to all clients if /gpt/ was not used
      socket.broadcast.emit('receive_message', data)
    }
  })

  // Check for every disconnection from the server
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})
//  --------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize the environment file
dotenv.config()

// JSON middlware - converting results into json
app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// Connection to the MongoDB database
if (mongoose.connect(process.env.MONGO_URL)) {
  console.log('Connected to DB')
}

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

// REGISTER Route
app.post('/auth/register', upload.single('picture'), register)

// LOGIN Route
app.post('/auth/login', (req, res) => {
  login(req, res)
})

// GET USER Route
app.get('/users/:id', (req, res) => {
  getUser(req, res)
})

// CREATE POST Route
app.post('/posts', upload.single('picture'), createPost)

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

// OPEN AI REQUEST
async function processMessageToChatGPT(chatMessages) {
  // messages is an array of messages
  // Format messages for chatGPT API
  // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}

  // let apiMessages = {role: "assistant", content: chatMessages}
  // const systemMessage = {
  //     role: "system",
  //     content: "Give many details and be super friendly"
  // }

  // Get the request body set up with the model we plan to use
  // and the messages which we formatted above. We add a system message in the front to'
  // determine how we want chatGPT to act.
  const apiRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'assistant',
        content:
          'Be very friendly, give details and ask questions. Limit all answears to 50 words.',
      },
      { role: 'user', content: chatMessages },
    ],
    temperature: 0,
  }

  try {
    const answear = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.CHATGPTKEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        return data.choices[0].message.content
      })

      return answear
  } catch (err) {
    console.log(err)
  }

}

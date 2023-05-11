import mongoose from "mongoose"
import User from "../schema/User.js"
import Post from "../schema/Post.js"

// REGISTER
export const register = async (req, res) => {
    try {
        const {name, email, password, picturePath} = req.body

        const newUser = new User({
            name,
            email,
            password,
            picturePath
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// LOGGIN
export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: "User does not exist. " })

        if (user.password !== password) return res.status(400).json({ msg: "Invalid credentials. " })

        delete user.password

        res.status(200).json({user})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// GET USER
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Routes for POSTS
// CREATE POST
export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body
      const user = await User.findById(userId)
      const newPost = new Post({
        userId,
        name: user.name,
        description,
        picturePath,
        userPicturePath: user.picturePath,
        likes: {}
      })
      await newPost.save()

      let mysort = { createdAt: -1 }
      const post = await Post.find().sort(mysort)
      res.status(201).json(post)
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// GET FEED POSTS
export const getFeedPosts = async (req, res) => {
    try {
      let mysort = { createdAt: -1 }
      const post = await Post.find().sort(mysort)
      res.status(200).json(post)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  };

  // GET USER's POSTS
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      let mysort = { createdAt: -1 }
      const post = await Post.find({ userId }).sort(mysort)
      res.status(200).json(post)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  };

// UPDATE POST Likes
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)
    
    if (isLiked) {
      post.likes.delete(userId)
      
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};
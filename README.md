# web_06_innerCircle_socialNetwork_complex
MongoDB/React/Node/Express - MERN (full stack) - a web application that allows users to create a profile, share posts and media, and engage with other users through likes, and messaging.

### You should be able to check it out here: https://innercircle-5ut0.onrender.com/

### Table of Contents
*Features
*Installation
*Usage

### Features
User Registration: Users can create new accounts to join the InnerCircle Social Network, by creating a profile. It only requires your email, photo, name and a password.
Post Sharing: Users can create and share posts and interact with other users' posts through likes, shares.
Messaging: There is a group chat feature, which allows you to chat with everyone who is logged on the same server. ( The chat has a hidden ChatGPT implementation - just write "/gpt/" at
the start of your message to request a response from ChatGPT - e.g. "/gpt/ Hello")

### Installation
Clone the repository:
git clone https://github.com/AlecsSandor/web_06_innerCircle_socialNetwork_complex.git

Install dependencies:
The app uses quite a large number of dependencies, especially in the frontend. 
You will have to run 'npm install' in both, client & server, directories.

Set up the database:
You will have to create a new free database in MongoDB and connect it to the server side. I have used environment variables so you can create .env file and just match the variables with the ones in the porject.

Access the application in your browser at http://localhost:3000.

### Usage
Visit the home page (http://localhost:3000) and click on the "Sign Up" button to create a new account.
After creating an account, you can log in and start exploring the InnerCircle.

Have fun with it!

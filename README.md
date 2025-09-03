Note It - Full-Stack Note-Taking Application
Welcome to Note It, a modern, secure, and feature-rich note-taking application. This project was built from the ground up, featuring a complete front-end built with React and a robust back-end powered by Node.js and Express. It allows users to manage their personal notes through a clean, dark-themed, and mobile-friendly interface.

This project was built to fulfill the requirements of a full-stack development assessment, including specific UI/UX designs, authentication flows, and technology stack choices.

Features
Secure User Authentication:

Multi-step signup flow using Email & OTP verification.

Seamless one-click Sign-up & Login with Google.

JWT Authorization: All sensitive actions (like managing notes) are protected using JSON Web Tokens to ensure only the authenticated user can access their data.

Full CRUD for Notes: Users can Create, Read, Edit and Delete their notes on a clean and intuitive dashboard.

Professional UI/UX:

A consistent, modern dark theme across the entire application.

A subtly animated, interactive background on authentication pages.

The UI is designed to be responsive and mobile-friendly.

Error Handling: The application provides clear feedback to the user for events like invalid credentials, existing user errors, or network issues.

Technology Stack
Front-End: React (with TypeScript), React Router, Axios, CSS Modules

Back-End: Node.js, Express, TypeScript, Mongoose

Database: MongoDB (via MongoDB Atlas)

Authentication: Passport.js (for Google OAuth 2.0), JWT, bcrypt.js

Email Service: SendGrid (for OTP delivery)

Version Control: Git

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You must have the following software installed on your machine:

Node.js (LTS version is recommended)

npm (comes installed with Node.js)

Git

Installation & Setup
Clone the Repository

# Replace [your-repo-url] with the actual URL of your Git repository
git clone [your-repo-url]
cd note-taking-app

Set Up the Back-End (server)

Navigate to the server directory:

cd server

Install the required npm packages:

npm install

Create a new file named .env in the server directory. This file will hold your secret keys and credentials. Add the following content to it, replacing the placeholder values with your actual keys:

# MongoDB Atlas Connection String
MONGO_URI=your_mongodb_connection_string

# JSON Web Token Secret
JWT_SECRET=a_long_random_and_secret_string_for_jwt

# SendGrid API Key for sending OTP emails
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=the_email_address_you_verified_with_sendgrid

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Set Up the Front-End (client)

From the root directory, navigate to the client directory:

cd ../client

Install the required npm packages:

npm install

Running the Application
You need to run both the back-end and front-end servers simultaneously in separate terminals.

Start the Back-End Server

Open a terminal and navigate to the server directory.

Run the command:

npm run dev

The server will start and be listening on http://localhost:5000.

Start the Front-End Application

Open a new terminal and navigate to the client directory.

Run the command:

npm start

The application will automatically open in your default web browser at http://localhost:3000.

You can now use the application, sign up, and test all its features locally.

Deployment
This application is composed of two parts that must be deployed separately:

Back-End: The server folder can be deployed as a "Web Service" on platforms like Render. You will need to configure the environment variables (from your .env file) in the hosting provider's dashboard.

Front-End: The client folder can be deployed as a "Static Site" on platforms like Netlify or Vercel. You will need to update the API_URL in client/src/services/api.ts to point to your live back-end URL and also update the Google OAuth redirect URIs to use your live URLs.
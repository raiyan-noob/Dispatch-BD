# Dispatch BD

Dispatch BD is a modern news and media web application built with Next.js, designed to deliver a polished reading experience with secure authentication, responsive design, and category-based content browsing. The platform combines a rich news interface with user account functionality, including email/password sign-up and Google OAuth login, making it suitable for a real-world digital publishing workflow.

## Project Description

Dispatch BD is a content-focused web app designed for news readers who want quick access to fresh updates, category-based stories, and a smooth digital experience. The application includes:

- A modern homepage with featured and latest news sections
- Responsive layouts for mobile and desktop devices
- News category and detail views
- User authentication using Better Auth
- MongoDB-backed user and session storage
- Social login with Google for convenient access

This project demonstrates a practical combination of frontend development, authentication, and database integration in a production-style Next.js application.

## Features

- Secure user registration and login
- Email/password authentication
- Google social sign-in
- Personalized user profile experience
- Modern responsive UI powered by Tailwind CSS
- News feed with featured stories and sections
- Built using the App Router in Next.js
- Easy deployment-ready configuration for production environments

## Technologies Used

- Next.js 16
- React 19
- JavaScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- @better-auth/mongo-adapter
- Resend
- ESLint
- Vercel-ready deployment structure

## Project Structure

```bash
dispatchbd/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── Sign-in/
│   │   ├── Sign-up/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── ...
├── lib/
│   ├── auth.js
│   └── auth-client.js
├── public/
├── .env
├── .gitignore
├── package.json
├── next.config.mjs
├── eslint.config.mjs
├── postcss.config.mjs
├── jsconfig.json
├── README.md
└── package-lock.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+ or newer
- npm
- MongoDB instance or MongoDB Atlas connection
- Google OAuth credentials (for social login)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd dispatchbd
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the required environment variables:

```env
MONGODB_URL="your_mongodb_connection_string"
BETTER_AUTH_SECRET="your_secure_secret"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Run the production build
npm run lint    # Run ESLint checks
```

## Environment Variables

The project uses the following environment variables for authentication and database setup:

- `MONGODB_URL` — MongoDB connection string for user and session storage
- `BETTER_AUTH_SECRET` — Secret key used by Better Auth
- `BETTER_AUTH_URL` — Application base URL for auth callbacks
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret

> Keep all secrets out of version control. Use environment variables in your local setup or deployment platform.

## Author

Designed and developed by [raiyan-noob](https://github.com/raiyan-noob).

## Notes

This project was developed as a full-stack authentication and frontend application exercise, combining secure access control with a modern editorial-style homepage. It is designed to be easy to extend with additional features such as article management, admin dashboards, user roles, and advanced content moderation.


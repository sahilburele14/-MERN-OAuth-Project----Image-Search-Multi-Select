# MERN + OAuth Image Search & Multi-Select Project

A full-stack image search application built with MERN stack and OAuth authentication.

## 🎯 Features

- ✅ OAuth Authentication (Google, Facebook, GitHub)
- ✅ Image Search using Unsplash API
- ✅ Multi-select images with counter
- ✅ Top Searches Banner (Top 5 searches across all users)
- ✅ Personal Search History
- ✅ Responsive 4-column grid layout

## 🏗️ Project Structure

```
mern-oauth-image-search/
├── client/          # React frontend
├── server/          # Express backend
├── README.md        # This file
└── package.json     # Root package.json (optional)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OAuth App Credentials (Google, Facebook, GitHub)
- Unsplash API Access Key

### Installation

1. **Clone/Navigate to project directory**
```bash
cd mern-oauth-image-search
```

2. **Install Server Dependencies**
```bash
cd server
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Setup Environment Variables**

**Server (.env):**
```env
MONGODB_URI=mongodb://localhost:27017/image-search
SESSION_SECRET=your-super-secret-session-key
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Client (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the Application**

**Terminal 1 - Start Server:**
```bash
cd server
npm start
```

**Terminal 2 - Start Client:**
```bash
cd client
npm start
```

7. **Open Browser**
- Navigate to `http://localhost:3000`

## 📋 API Endpoints

### Authentication
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `GET /auth/github` - GitHub OAuth login
- `GET /auth/logout` - Logout user
- `GET /auth/user` - Get current user

### Search
- `POST /api/search` - Search images
  - Body: `{ term: "search query" }`
  - Returns: Image results from Unsplash

### History
- `GET /api/history` - Get user's search history
  - Returns: Array of search terms with timestamps

### Top Searches
- `GET /api/top-searches` - Get top 5 searches
  - Returns: Array of top search terms

## 🛠️ Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (OAuth strategies)
- express-session
- Unsplash API

### Frontend:
- React.js
- Axios
- React Router
- CSS Modules / Styled Components

## 📝 Getting OAuth Credentials

### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`

### Facebook OAuth:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Set redirect URI: `http://localhost:5000/auth/facebook/callback`

### GitHub OAuth:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`

### Unsplash API:
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Get Access Key

## 🎨 Features Details

### 1. OAuth Authentication
- Users can login with Google, Facebook, or GitHub
- Session-based authentication
- Protected routes on frontend

### 2. Image Search
- Search images using Unsplash API
- Results displayed in 4-column responsive grid
- Shows search term and result count

### 3. Multi-Select
- Checkbox overlay on each image
- Real-time counter showing selected images
- Client-side state management

### 4. Top Searches Banner
- Shows top 5 most searched terms
- Updates dynamically
- Displayed at the top of the app

### 5. Search History
- Personal search history for each user
- Shows search term and timestamp
- Accessible via sidebar or dedicated section

## 🔒 Security Features

- Session-based authentication
- Secure OAuth flow
- CORS configuration
- Environment variables for sensitive data

## 📦 Deployment

### Backend Deployment (Heroku/ Railway/ Render):
1. Set environment variables
2. Deploy MongoDB (MongoDB Atlas)
3. Update OAuth redirect URIs
4. Deploy server

### Frontend Deployment (Vercel/ Netlify):
1. Set `REACT_APP_API_URL` to backend URL
2. Deploy React app

## 🐛 Troubleshooting

- **OAuth not working**: Check redirect URIs match exactly
- **MongoDB connection error**: Verify connection string
- **Unsplash API error**: Check API key and rate limits
- **CORS errors**: Verify CLIENT_URL in backend .env

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using MERN Stack**


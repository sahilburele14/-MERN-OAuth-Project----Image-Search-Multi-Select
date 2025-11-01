# Setup Instructions - MERN OAuth Image Search

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher) installed
- MongoDB installed locally OR MongoDB Atlas account
- OAuth credentials (Google, Facebook, GitHub)
- Unsplash API access key

---

## 🔑 Getting API Keys

### 1. Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key

### 2. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Authorized redirect URI: `http://localhost:5000/auth/google/callback`

### 3. Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Set redirect URI: `http://localhost:5000/auth/facebook/callback`

### 4. GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:5000/auth/github/callback`

---

## 🚀 Installation Steps

### Step 1: Install Server Dependencies

```bash
cd server
npm install
```

### Step 2: Install Client Dependencies

```bash
cd ../client
npm install
```

### Step 3: Configure Environment Variables

**Create `server/.env`:**
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
NODE_ENV=development
```

**Create `client/.env`:**
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**OR use MongoDB Atlas:**
- Update `MONGODB_URI` in `server/.env` with your Atlas connection string

### Step 5: Run the Application

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

### Step 6: Open Browser

Navigate to: `http://localhost:3000`

---

## ✅ Verification

1. **Server running**: Check `http://localhost:5000/health`
2. **Client running**: Check `http://localhost:3000`
3. **Database**: Verify MongoDB connection in server logs
4. **OAuth**: Test login with one of the providers

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas: Whitelist your IP address

### OAuth Not Working
- Verify redirect URIs match exactly
- Check OAuth credentials in `.env`
- Clear browser cookies and try again

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches your React app URL
- Check `withCredentials: true` in axios config

### Unsplash API Errors
- Verify API key is correct
- Check rate limits (50 requests/hour for free tier)

---

## 📦 Project Structure

```
mern-oauth-image-search/
├── server/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── config/          # Passport config
│   ├── server.js        # Main server file
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utilities
│   └── package.json
└── README.md
```

---

## 🎯 Features Checklist

- [x] OAuth Authentication (Google, Facebook, GitHub)
- [x] Image Search with Unsplash API
- [x] Multi-select images with counter
- [x] Top Searches Banner
- [x] Search History
- [x] Responsive Design

---

**You're all set! Happy coding! 🚀**


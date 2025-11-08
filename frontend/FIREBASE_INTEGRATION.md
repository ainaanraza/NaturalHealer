# Firebase Integration Guide

## 🔥 Overview

This application now uses **Firebase** for:
- **Authentication**: User signup, login, logout, and password reset
- **Firestore Database**: Storing user data and chat history sessions

## 📋 Features Implemented

### 1. User Authentication
- **Sign Up**: Create new user accounts with email and password
- **Login**: Authenticate existing users  
- **Logout**: Sign out users securely
- **Password Reset**: Send password reset emails via Firebase
- **Persistent Sessions**: Auto-login on page refresh using Firebase auth state listener

### 2. Chat History Storage
- **Session Management**: Each chat conversation is stored as a session
- **Message Pairs**: User questions and AI responses are saved together
- **Auto-naming**: First message becomes the chat title
- **Load Previous Chats**: Access and continue old conversations
- **Multiple Sessions**: Create unlimited chat sessions per user

## 🏗️ Architecture

### Firebase Configuration
**File**: `src/services/firebase.js`
```javascript
// Initializes Firebase app with your credentials
// Exports auth and db instances for use throughout app
```

### Authentication Service
**File**: `src/services/authService.js`

Functions:
- `signUpUser(email, password, name)` - Create new account
- `signInUser(email, password)` - Login existing user
- `signOutUser()` - Logout current user
- `resetPassword(email)` - Send password reset email
- `getCurrentUser()` - Get current authenticated user

### Chat History Service
**File**: `src/services/chatHistoryService.js`

Functions:
- `createChatSession(userId, title)` - Start new chat session
- `saveMessagePair(sessionId, userMessage, aiResponse)` - Save Q&A pair
- `getUserChatSessions(userId)` - Get all user's chat sessions
- `getChatSessionMessages(sessionId)` - Load messages from a session
- `updateChatSessionTitle(sessionId, newTitle)` - Rename a session
- `deleteChatSession(sessionId)` - Delete a session

## 📊 Firestore Data Structure

### Users Collection
```
users/
  {userId}/
    - uid: string
    - email: string
    - displayName: string
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Chat Sessions Collection
```
chatSessions/
  {sessionId}/
    - userId: string
    - title: string
    - messageCount: number
    - createdAt: timestamp
    - updatedAt: timestamp
    
    messages/ (subcollection)
      {messageId}/
        - userMessage: string
        - aiResponse: string
        - timestamp: timestamp
```

## 🔐 Firebase Configuration

Your Firebase project credentials:
```javascript
{
  apiKey: "AIzaSyDj_UYfBQe_3BHHmMPQjmIGNCwNQCF-RCI",
  authDomain: "naturalhealer.firebaseapp.com",
  projectId: "naturalhealer",
  storageBucket: "naturalhealer.firebasestorage.app",
  messagingSenderId: "460992322219",
  appId: "1:460992322219:web:5d394f5d3aed0bb9a535ee",
  measurementId: "G-KN0LEQ60D1"
}
```

## 🛠️ Components Updated

### 1. App.jsx
- Added Firebase auth state listener (`onAuthStateChanged`)
- Removed localStorage-based authentication
- Added loading state while checking auth
- Passes user object to FloatingAIChat

### 2. Login.jsx
- Uses `signInUser()` from authService
- Shows error messages from Firebase
- Removed mock authentication

### 3. Signup.jsx
- Uses `signUpUser()` from authService
- Creates user profile in Firestore
- Shows Firebase validation errors
- Simplified password requirements (removed complex regex)

### 4. ForgotPassword.jsx
- Uses `resetPassword()` from authService
- Sends actual password reset emails via Firebase

### 5. FloatingAIChat.jsx
**New Features**:
- ✅ Saves every chat message to Firestore
- ✅ Loads previous chat sessions
- ✅ Chat history sidebar (toggle with history button)
- ✅ Create new chat sessions
- ✅ Auto-creates session on first message
- ✅ Session titles from first message

**New State Variables**:
- `currentSessionId` - Active chat session ID
- `chatSessions` - List of all user's sessions
- `showHistory` - Toggle history sidebar

**New Functions**:
- `loadChatSessions()` - Fetch all sessions
- `createNewSession()` - Start fresh conversation
- `loadChatSession(id)` - Load previous conversation

**New UI Elements**:
- History button (📁 icon)
- New chat button (+ icon)
- History sidebar with session list
- Session metadata (message count, date)

## 🎨 Styles Added

### Auth.css
- `.auth-error-banner` - Error message display
- `.auth-loading` - Loading spinner during auth check

### FloatingAIChat.css
- `.floating-chat-history` - Sidebar container
- `.floating-chat-history-btn` - History toggle button
- `.floating-chat-new-btn` - New chat button
- `.floating-history-header` - Sidebar header
- `.floating-history-list` - Sessions list
- `.floating-history-item` - Individual session
- `.floating-history-empty` - Empty state

## 🚀 Usage

### For Users

1. **Sign Up**
   - Navigate to `/signup`
   - Enter name, email, and password (min 6 chars)
   - Click "Create Account"
   - Redirected to homepage

2. **Login**
   - Navigate to `/login`
   - Enter email and password
   - Click "Sign In"
   - Redirected to homepage

3. **Use AI Chat**
   - Click AI button in navbar
   - Ask questions - automatically saved
   - Click history icon to view past chats
   - Click + to start new chat
   - Click on old session to continue

4. **Logout**
   - Click logout button in navbar
   - Session ends, data remains in Firebase

5. **Forgot Password**
   - Click "Forgot password?" on login
   - Enter email
   - Check email for reset link
   - Follow link to reset password

### For Developers

**Test Authentication**:
```javascript
import { signUpUser, signInUser } from './services/authService'

// Sign up
const result = await signUpUser('test@example.com', 'password123', 'Test User')
if (result.success) {
  console.log('User created:', result.user)
}

// Sign in
const loginResult = await signInUser('test@example.com', 'password123')
if (loginResult.success) {
  console.log('Logged in:', loginResult.user)
}
```

**Test Chat History**:
```javascript
import { createChatSession, saveMessagePair } from './services/chatHistoryService'

// Create session
const session = await createChatSession(userId, 'My Chat')

// Save message
await saveMessagePair(
  session.sessionId, 
  'What is turmeric good for?',
  'Turmeric has anti-inflammatory properties...'
)
```

## 🔒 Security Notes

### Current Setup (Development)
- Firebase rules are currently permissive for development
- All authenticated users can read/write their own data

### Production Recommendations
1. **Firestore Security Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own chat sessions
    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null && 
                            resource.data.userId == request.auth.uid;
      
      // Allow access to messages subcollection
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

2. **Move API Keys**:
   - Store Firebase config in `.env` file
   - Add `.env` to `.gitignore`
   - Use `import.meta.env.VITE_FIREBASE_API_KEY` etc.

3. **Enable Email Verification**:
   - Require users to verify email before using app
   - Add `sendEmailVerification()` after signup

## 📦 Dependencies

```json
{
  "firebase": "^11.x.x"
}
```

## 🐛 Troubleshooting

### "Firebase: Error (auth/email-already-in-use)"
- User trying to sign up with existing email
- Ask them to login instead or use password reset

### "Firebase: Error (auth/wrong-password)"
- Incorrect password during login
- User should use "Forgot password?"

### "Firebase: Error (auth/user-not-found)"
- Email doesn't exist in database
- User should sign up first

### Chat history not saving
- Check browser console for Firestore errors
- Verify user is authenticated (`user` prop exists)
- Check Firebase console for security rule blocks

### Sessions not loading
- Check network tab for Firestore requests
- Verify `userId` matches Firebase auth UID
- Check Firestore indexes (may need to create them)

## 🎯 Next Steps

### Recommended Enhancements
1. **Social Authentication**: Add Google/Facebook login
2. **Email Verification**: Require verified emails
3. **User Profiles**: Allow users to update display name, avatar
4. **Chat Export**: Download chat history as PDF/JSON
5. **Search**: Search within chat history
6. **Tags**: Tag/categorize chat sessions
7. **Favorites**: Star important messages
8. **Sharing**: Share chat sessions with others
9. **Analytics**: Track usage with Firebase Analytics
10. **Offline Support**: Enable Firestore offline persistence

### Performance Optimizations
- Paginate chat session list (load 20 at a time)
- Lazy load old messages (infinite scroll)
- Cache recent sessions in localStorage
- Optimize Firestore queries with indexes
- Use Firebase Storage for large data (images, files)

## 📝 Migration Notes

### Breaking Changes from Previous Version
- ❌ No more localStorage-based auth
- ❌ Mock user data no longer works
- ✅ All auth flows now use real Firebase
- ✅ Chat history persists across devices
- ✅ Real email/password validation

### Data Migration (if needed)
If you had users in the old localStorage system:
1. Export old user data
2. Create Firebase accounts programmatically
3. Import to Firestore users collection

## 🙏 Credits

- **Firebase**: Authentication and Database
- **Google Generative AI**: Chat responses
- **React**: Frontend framework
- **Vite**: Build tool

---

**Last Updated**: November 8, 2025  
**Version**: 2.0.0 (Firebase Integration)

# 🧪 Firebase Integration Testing Guide

## Quick Start Testing

### 1. Test User Signup
1. Navigate to `http://localhost:5174/signup`
2. Fill in the form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: test123 (min 6 characters)
   - **Confirm Password**: test123
   - ✅ Check "I agree to terms"
3. Click **"Create Account"**
4. You should be redirected to `/home` automatically
5. **Check Firebase Console**: 
   - Go to Firebase Console > Authentication
   - You should see the new user: test@example.com
   - Go to Firestore Database > users collection
   - You should see a document with the user data

### 2. Test Chat Saving
1. On the homepage, click the **AI Assistant button** (🤖) in the navbar
2. The floating chat window should open
3. Type a question: "What are remedies for headaches?"
4. Press Enter or click Send
5. Wait for the AI response (should appear with formatting)
6. **Check Firestore Console**:
   - Go to Firestore Database > chatSessions collection
   - You should see a new session document
   - Expand it > messages subcollection
   - You should see your message pair (userMessage + aiResponse)
7. Ask another question: "How can I improve sleep naturally?"
8. Verify the second message is saved in the same session

### 3. Test Chat History
1. In the open chat, click the **history button** (📁 icon on the left)
2. A sidebar should slide in from the left
3. You should see your chat session listed with:
   - Title: "What are remedies for headaches..." (truncated first message)
   - Message count: 2 messages
   - Date: Today's date
4. Click the **X** to close the history sidebar
5. Click the **+ button** (new chat)
6. This should create a new session with a fresh chat
7. Ask a different question to create a second session
8. Open history again - you should now see 2 sessions
9. Click on the first session to load it
10. Verify the old messages appear correctly

### 4. Test Session Persistence
1. **Close the browser tab completely**
2. Open a new tab and navigate to `http://localhost:5174/`
3. You should be **automatically logged in** (no need to login again)
4. Click the AI Assistant button
5. Open the history sidebar
6. **Verify**: All your previous chat sessions are still there
7. Click on a session to load the old conversation
8. **Verify**: All messages appear exactly as they were

### 5. Test Logout
1. Click the **Logout button** in the navbar
2. You should be redirected to the landing page (`/`)
3. Try to navigate to `/home` directly
4. You should be redirected to `/login`
5. All chat data is still safe in Firebase (not deleted on logout)

### 6. Test Login
1. Navigate to `/login`
2. Enter:
   - **Email**: test@example.com
   - **Password**: test123
3. Click **"Sign In"**
4. You should be redirected to `/home`
5. Open AI chat and history
6. **Verify**: All your previous sessions are still available

### 7. Test Password Reset
1. Logout if logged in
2. Navigate to `/login`
3. Click **"Forgot password?"**
4. Enter the email: test@example.com
5. Click **"Send Reset Link"**
6. You should see a success screen
7. **Check your email inbox** (the one you used for signup)
8. You should receive an email from Firebase
9. Click the reset link in the email
10. Set a new password
11. Return to the app and login with the new password

### 8. Test Error Handling

#### Invalid Signup
1. Try to sign up with the same email again
2. **Expected**: Error message "This email is already registered"

#### Invalid Login
1. Try to login with wrong password
2. **Expected**: Error message "Invalid email or password"

#### Weak Password
1. Try to sign up with password "123"
2. **Expected**: Error message "Password must be at least 6 characters"

### 9. Test Cross-Device Sync
1. Login on one browser (e.g., Chrome)
2. Create some chat sessions
3. Open the app in another browser (e.g., Firefox or Edge)
4. Login with the same credentials
5. **Verify**: All chat sessions appear in the second browser
6. Create a new session in the second browser
7. Refresh the first browser
8. **Verify**: The new session appears in both browsers

## Firestore Data Verification

### Check Users Collection
```
Firestore Console > users > {userId}
```
Should contain:
- uid: matching the auth user ID
- email: user's email
- displayName: user's name
- createdAt: timestamp
- updatedAt: timestamp

### Check Chat Sessions
```
Firestore Console > chatSessions > {sessionId}
```
Should contain:
- userId: matching the auth user ID
- title: first message text (truncated)
- messageCount: number of message pairs
- createdAt: timestamp
- updatedAt: timestamp (updates with each message)

### Check Messages Subcollection
```
Firestore Console > chatSessions > {sessionId} > messages > {messageId}
```
Should contain:
- userMessage: the question text
- aiResponse: the AI answer text
- timestamp: when message was sent

## Common Issues & Solutions

### Issue: "Firebase: Error (auth/network-request-failed)"
**Solution**: Check your internet connection. Firebase requires internet access.

### Issue: Chat messages not saving
**Solution**: 
1. Check browser console for errors
2. Verify you're logged in (check navbar shows logout button)
3. Check Firestore rules in Firebase Console
4. Verify `user.uid` exists in the FloatingAIChat component

### Issue: "Permission denied" in Firestore
**Solution**: 
1. Go to Firebase Console > Firestore Database > Rules
2. For testing, temporarily use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. For production, use the rules in `firestore.rules` file

### Issue: Old localStorage data interfering
**Solution**:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage > http://localhost:5174
3. Clear all `naturalHealer_*` keys
4. Refresh the page

### Issue: Chat history sidebar not showing sessions
**Solution**:
1. Check browser console for errors
2. Verify Firestore has data (check Firebase Console)
3. Make sure the `userId` in sessions matches your auth `uid`
4. Check network tab for failed Firestore requests

## Performance Testing

### Test Message Loading Speed
1. Create a session with 20+ messages
2. Close and reopen the chat
3. Load the session from history
4. **Expected**: Messages load within 1-2 seconds

### Test Multiple Sessions
1. Create 10+ chat sessions
2. Open chat history
3. **Expected**: All sessions load and display smoothly
4. Click through different sessions
5. **Expected**: No lag when switching

## Security Testing

### Test Unauthorized Access
1. Logout completely
2. Try to access `/home` directly
3. **Expected**: Redirected to `/login`

### Test Data Isolation
1. Create account: user1@test.com
2. Create some chat sessions
3. Logout
4. Create account: user2@test.com
5. Open chat history
6. **Expected**: user2 cannot see user1's sessions

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (Chrome/Safari)

## Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Data persists after page refresh
- ✅ Data syncs across devices
- ✅ Authentication works correctly
- ✅ Chat history saves and loads
- ✅ Firestore security rules protect data
- ✅ Password reset emails send
- ✅ Error messages display clearly

---

**Happy Testing! 🎉**

If you encounter any issues not covered here, check:
1. Browser console for errors
2. Network tab for failed requests
3. Firebase Console for data
4. `FIREBASE_INTEGRATION.md` for detailed documentation

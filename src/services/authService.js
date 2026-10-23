import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase';
import { api } from './api';

// Profiles live on the server; create or update them through the API.
// A failure here must not block sign-in, so it is logged and retried on next load.
const syncProfile = async (displayName) => {
  try {
    await (displayName ? api('/profile', { method: 'PUT', body: { displayName } }) : api('/profile'));
  } catch (error) {
    console.error('Profile sync failed:', error);
  }
};

export const signUpUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name
    });

    await syncProfile(name);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: name
      }
    };
  } catch (error) {
    console.error('Sign up error:', error);
    
    let errorMessage = 'Failed to create account. Please try again.';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered. Please login instead.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'User'
      }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    
    let errorMessage = 'Failed to sign in. Please try again.';
    
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    // First Google sign-in: the server creates the profile from the token
    await syncProfile();

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'User'
      }
    };
  } catch (error) {
    console.error('Google sign in error:', error);

    let errorMessage = 'Failed to sign in with Google. Please try again.';

    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Google sign-in was cancelled.';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked. Please allow popups for this site and try again.';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = 'An account already exists with this email. Please log in with your password.';
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMessage = 'Google sign-in is not enabled yet.';
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: 'Failed to sign out. Please try again.'
    };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent! Please check your inbox.'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    
    let errorMessage = 'Failed to send reset email. Please try again.';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

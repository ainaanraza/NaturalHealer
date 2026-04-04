import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export const createChatSession = async (userId, title = 'New Chat') => {
  try {
    console.log('Creating chat session for userId:', userId, 'with title:', title);
    const sessionRef = await addDoc(collection(db, 'Users', userId, 'Chats'), {
      title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      messageCount: 0
    });

    console.log('Chat session created with ID:', sessionRef.id);
    return {
      success: true,
      sessionId: sessionRef.id
    };
  } catch (error) {
    console.error('Error creating chat session:', error);
    return {
      success: false,
      error: 'Failed to create chat session'
    };
  }
};

export const saveMessagePair = async (userId, sessionId, userMessage, aiResponse) => {
  try {
    console.log('Saving message pair to session:', sessionId);
    console.log('User message:', userMessage.substring(0, 50));
    console.log('AI response:', aiResponse.substring(0, 50));
    
    await addDoc(collection(db, 'Users', userId, 'Chats', sessionId, 'messages'), {
      userMessage,
      aiResponse,
      timestamp: serverTimestamp()
    });

    console.log('Message added to subcollection');
    
    const sessionRef = doc(db, 'Users', userId, 'Chats', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      console.error('Session document does not exist:', sessionId);
      return {
        success: false,
        error: 'Session not found'
      };
    }
    
    const currentCount = sessionDoc.data()?.messageCount || 0;
    console.log('Current message count:', currentCount);

    await updateDoc(sessionRef, {
      updatedAt: serverTimestamp(),
      messageCount: currentCount + 1,
      ...(currentCount === 0 && { 
        title: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : '')
      })
    });

    console.log('Session updated successfully');
    return { success: true };
  } catch (error) {
    console.error('Error saving message:', error);
    console.error('Error details:', error.message);
    return {
      success: false,
      error: 'Failed to save message'
    };
  }
};

export const getUserChatSessions = async (userId) => {
  try {
    const q = query(
      collection(db, 'Users', userId, 'Chats'),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const sessions = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sessions.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });

    return {
      success: true,
      sessions
    };
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return {
      success: false,
      error: 'Failed to fetch chat sessions',
      sessions: []
    };
  }
};

export const getChatSessionMessages = async (userId, sessionId) => {
  try {
    const q = query(
      collection(db, 'Users', userId, 'Chats', sessionId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const messages = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate()
      });
    });

    return {
      success: true,
      messages
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return {
      success: false,
      error: 'Failed to fetch messages',
      messages: []
    };
  }
};

export const deleteChatSession = async (userId, sessionId) => {
  try {
    const sessionRef = doc(db, 'Users', userId, 'Chats', sessionId);
    await deleteDoc(sessionRef);

    return { success: true };
  } catch (error) {
    console.error('Error deleting session:', error);
    return {
      success: false,
      error: 'Failed to delete session'
    };
  }
};

export const updateChatSessionTitle = async (userId, sessionId, newTitle) => {
  try {
    const sessionRef = doc(db, 'Users', userId, 'Chats', sessionId);
    await updateDoc(sessionRef, {
      title: newTitle,
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating session title:', error);
    return {
      success: false,
      error: 'Failed to update session title'
    };
  }
};

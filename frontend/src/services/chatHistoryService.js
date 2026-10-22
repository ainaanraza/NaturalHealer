import { api } from './api'

// Conversation history, served by the API. Chats are created by the server on the
// first message, so there is no separate "create" call.

const withDates = (chat) => ({
  ...chat,
  createdAt: chat.createdAt ? new Date(chat.createdAt) : null,
  updatedAt: chat.updatedAt ? new Date(chat.updatedAt) : null,
})

export async function getUserChatSessions() {
  try {
    const { chats } = await api('/chats')
    return { success: true, sessions: chats.map(withDates) }
  } catch (error) {
    return { success: false, error: error.message, sessions: [] }
  }
}

export async function getChatSessionMessages(sessionId) {
  try {
    const { messages } = await api(`/chats/${encodeURIComponent(sessionId)}`)
    return {
      success: true,
      messages: messages.map(m => ({ ...m, timestamp: m.createdAt ? new Date(m.createdAt) : null })),
    }
  } catch (error) {
    return { success: false, error: error.message, messages: [] }
  }
}

export async function deleteChatSession(sessionId) {
  try {
    await api(`/chats/${encodeURIComponent(sessionId)}`, { method: 'DELETE' })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function updateChatSessionTitle(sessionId, title) {
  try {
    await api(`/chats/${encodeURIComponent(sessionId)}`, { method: 'PATCH', body: { title } })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

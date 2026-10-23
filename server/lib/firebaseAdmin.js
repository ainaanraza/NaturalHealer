import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Credentials come from the environment, never from the repo. Either:
//   FIREBASE_SERVICE_ACCOUNT  the service account JSON (raw or base64), or
//   FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
function credentials() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
  if (raw) {
    const text = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8')
    return JSON.parse(text)
  }
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    return {
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // Env UIs often store the newlines escaped
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
  }
  return null
}

export function isFirebaseConfigured() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT || (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY))
}

function app() {
  if (getApps().length) return getApps()[0]
  const creds = credentials()
  if (!creds) throw new Error('Firebase Admin credentials are not configured.')
  return initializeApp({ credential: cert(creds) })
}

export const adminAuth = () => getAuth(app())
export const adminDb = () => getFirestore(app())

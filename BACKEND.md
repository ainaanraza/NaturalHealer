# Natural Healer backend

Serverless API on Vercel (`/api`), with Firebase Auth for sign-in and Firestore for data. The browser never talks to Gemini or writes to Firestore directly: every call goes through the API, which verifies the user's Firebase ID token.

```
browser ──(Firebase ID token)──▶ /api/*  (Vercel functions)
                                   ├─ verify token        firebase-admin
                                   ├─ rate limit          Firestore counters
                                   ├─ safety triage       server/lib/safety.js
                                   ├─ Gemini (streaming)  server/lib/gemini.js, model fallback
                                   └─ read/write data     Firestore (users/{uid}/...)
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/chat` | Ask Vanya. Streams server-sent events: `meta`, `delta`…, then `done` or `error`. Body: `message`, optional `chatId`, `conditionId`, and `ephemeral` + `history` for the unsaved condition chat. |
| GET | `/api/chats` | The user's conversations, newest first |
| GET / PATCH / DELETE | `/api/chats/:id` | Read messages, rename, delete |
| GET / PUT | `/api/favorites` | Saved conditions (unknown ids are dropped) |
| GET / PUT | `/api/profile` | Profile, created on first call; PUT changes `displayName` |
| GET / POST | `/api/prakriti` | Questionnaire and saved result; POST scores and saves the answers |
| GET | `/api/health` | Which parts are configured (never the values) |

Rate limits per user: 20 chats per 10 minutes and 150 per day, 60 writes per minute, and 10 prakriti submissions per hour.

## Safety triage

Every chat message is checked before the AI is called (`server/lib/safety.js`):

- **Emergency** (for example chest pain, trouble breathing, stroke signs, self-harm, or fever in a young baby): no AI call. Vanya replies with a fixed "seek care now" message, pointing to 112 and, for self-harm, Tele-MANAS 14416.
- **Caution** (for example pregnancy, young children, prescription medicines, chronic conditions, or a long fever): the AI answers, but the reply opens with a doctor notice and the model is told to stay conservative.
- Each triggered event is logged to `safetyEvents` with its category only, never the message text.

## Data model (Firestore)

```
users/{uid}                              displayName, email, favorites[], prakriti, createdAt, updatedAt
users/{uid}/chats/{chatId}               title, conditionId, messageCount, createdAt, updatedAt
users/{uid}/chats/{chatId}/messages/{id} role, text, triage, createdAt
safetyEvents/{id}                        uid, chatId, level, categories, createdAt
rateLimits/{uid_bucket}                  count, windowStart, expiresAt
```

`firestore.rules` lets users read only their own documents and blocks all client writes.

## Setup you need to do

1. **Rotate the Gemini key.** The old `VITE_GEMINI_API_KEY` was baked into the public JavaScript, so treat it as leaked. Create a new key in Google AI Studio and delete the old one.
2. **Create a Firebase service account.** Go to Firebase console > Project settings > Service accounts > Generate new private key.
3. **Set the Vercel environment variables** (Project > Settings > Environment Variables): `GEMINI_API_KEY`, and `FIREBASE_SERVICE_ACCOUNT` (the JSON on one line). Remove `VITE_GEMINI_API_KEY` from Vercel. See `.env.example`.
4. **Deploy the Firestore rules.** Paste `firestore.rules` into Firebase console > Firestore > Rules, or run `firebase deploy --only firestore:rules`.
5. **Copy old chats into the new layout.** Run `npm run migrate:chats`, which is a dry run; then run `npm run migrate:chats -- --write`. Old chats stay where they are until you delete them.
6. **Optional:** in Firestore, add a TTL policy on `rateLimits.expiresAt` so old counters clean themselves up.

## Local development

```bash
npm run dev:api:memory   # API on :3001 with in-memory data and a fake user, no credentials needed
npm run dev              # site on :5173, proxies /api to :3001
npm test                 # server tests
```

`npm run dev:api` uses real Firestore and Auth instead; it needs `.env` filled in as in `.env.example`. In-memory mode and the fake user are refused on Vercel (`VERCEL=1`).

## Model

The default model is `gemini-3.8-flash`, which falls back to `gemini-3.5-flash` and then `gemini-flash-lite-latest` when a model is overloaded, retired or slow to start. Override with `GEMINI_MODEL` and `GEMINI_FALLBACK_MODELS`. `gemini-2.5-flash`, which the old code used, is no longer available for new keys.

import * as admin from 'firebase-admin'

import { googleCredential } from 'config/google'

export const initialFirebaseAdmin = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(googleCredential()),
      databaseURL: 'https://giornie-6e979.firebaseio.com',
    })
  } catch (error) {
    return error
  }
}

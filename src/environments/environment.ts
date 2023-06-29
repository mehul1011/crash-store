import { FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

firebaseConfig.apiKey = process.env.FIREBASE_API_KEY as string;
firebaseConfig.authDomain = process.env.FIREBASE_AUTH_DOMAIN as string;
firebaseConfig.projectId = process.env.FIREBASE_PROJECT_ID as string;
firebaseConfig.storageBucket = process.env.FIREBASE_STORAGE_BUCKET as string;
firebaseConfig.messagingSenderId = process.env
  .FIREBASE_MESSAGING_SENDER_ID as string;
firebaseConfig.appId = process.env.FIREBASE_APP_ID as string;
firebaseConfig.measurementId = process.env.FIREBASE_MEASUREMENT_ID as string;

const environment = {
  production: false,
};

export { firebaseConfig, environment };

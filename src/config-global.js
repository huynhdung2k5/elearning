// ----------------------------------------------------------------------
// Config global
// ----------------------------------------------------------------------
// routes
import { PATH_ROOTS } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.HOST_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAP_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_ROOTS.general.app; // as '/general/overview'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 92,
  H_DASHBOARD_MAIN_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_MAIN: 280,
  W_MAIN_MINI: 88,
  //
  H_MAIN_ITEM: 48,
  H_MAIN_ITEM_SUB: 36,
  //
  H_MAIN_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

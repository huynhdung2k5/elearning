const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    // HOST_API_KEY = "http://localhost:5000/api/v1",
    HOST_API_KEY: 'http://192.168.50.85:3000/api',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: 'AIzaSyAcmHTqTF1NZsMtezjNT7wnrXRMFRDW594',
    FIREBASE_AUTH_DOMAIN: 'test-22824.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://test-22824-default-rtdb.firebaseio.com',
    FIREBASE_PROJECT_ID: 'test-22824',
    FIREBASE_STORAGE_BUCKET: 'test-22824.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '343675098046',
    FIREBASE_APPID: '1:343675098046:web:9d3cf4c1aae647d09d9fef',
    FIREBASE_MEASUREMENT_ID: 'G-ERNFGTBPPT',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
});

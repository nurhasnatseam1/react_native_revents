import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {composeWithDevTools} from 'redux-devtools-extension';
import {getFirestore, firestoreReducer,createFirestoreInstance, reduxFirestore} from 'redux-firestore';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose,applyMiddleware } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer, getFirebase } from 'react-redux-firebase'
import LoginScreen from './screens/auth/login';
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
  apiKey: "AIzaSyBoTQbJ9382ZQnGUv6OEIw87Fu1MRoUroo",
  authDomain: "revents-977c1.firebaseapp.com",
  databaseURL: "https://revents-977c1.firebaseio.com",
  projectId: "revents-977c1",
  storageBucket: "revents-977c1.appspot.com",
  messagingSenderId: "682667176462",
  appId: "1:682667176462:web:55186c31c50d8f69b4825f",
  measurementId: "G-DZPTCPLFV5"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer// <- needed if using firestore
})
//middleware
const middlewares=[reduxThunk.withExtraArgument({getFirebase,getFirestore})]
//composeEnhancer
const composeEnhancer=composeWithDevTools(applyMiddleware(...middlewares),
reduxFirestore(firebase))
// Create store with reducers and initial state

const store = createStore(rootReducer,composeEnhancer)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


///import loacal packages
import RootNavigator from './navigation/navigator';


export default function App() {
  return (
    <View style={styles.container}>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <LoginScreen></LoginScreen>
       {/* { <RootNavigator/>} */}
      </ReactReduxFirebaseProvider>
    </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});







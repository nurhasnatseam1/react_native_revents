import {SubmissionError,reset} from 'redux-form';
//can not use Alert outside react element you have  to use only alert function
import { Alert } from 'react-native';

//these imports are for social login
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn  from 'expo-google-sign-in';

export const login=cred=>{
      return async (dispatch,getState,{getFirebase,getFirestore})=>{
            const firebase=getFirebase();
            try{
                  await firebase.auth().signInWithEmailAndPassword(creds.email,creds.password);

            }catch(error){
                  console.log(error)
                  throw new SubmissionError({
                        _error:error.message
                  })
            }
      }
}



export const registerUser=user=>async (dispatch,getState,{getFirestore,getFirebase})=>{
      const firebase=getFireabse();
      const firestore=getFirestore();


      try{
            let createdUser=await firebase.auth.createUserWithEmailAndPassword(user.email,user.password);
            console.log(createdUser);
            await createdUser.user.updateProfile({
                  displayName:user.displayName,
            })

            let newUser={
                  displayName:user.displayName,
                  createdAt:firestore.FieldValue.serverTimestamp()
            }

            await firestore.set(`users/${createdUser.user.uid}`,{...newUser})
      }catch(error){
            console.log(error)
            throw new SubmissionError({
                  _error:error.message
            })
      }
}

export const updatePassword=(creds)=>async (dispatch,getState,{getFirebase})=>{
      const firebase=getFirebase()
      const user=firebase.auth().currentUser;
      try{
            await user.updatePassword(creds.newPassword);
            await dispatch(reset('account'))
            Alert.alert('success','Your password has been updated')
      }catch(error){
            throw new SubmissionError({
                  _error:error.message
            })
      }
}

export const facebookLogin=()=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      try {
            await Facebook.initializeAsync('306354656626061')
            const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
            if (type === 'success') {
              /* // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
              Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`); */
              

              //including firebase
              const credential = firebase.auth.FacebookAuthProvider.credential(token);
              firebase.auth().signInWithCredential(credential).catch((error) => {
                    // Handle Errors here.
                  });

            } else {
              console.log('there was a problem connecting with facebook when login with facebook')
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
}

//these are client id's to use for google login
const IOS_CLIENT_ID='682667176462-t8ng7a2089vqn38svtipkau8jduaoq2b.apps.googleusercontent.com'
const ANDROID_CLIENT_ID='682667176462-mtdv8g1hhe3lkkte8qvf2oal5f32p8qm.apps.googleusercontent.com'



//only works in expo client app but not in production standalone app
export const expoGoogleLogin=()=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      try {
            const result = await Google.logInAsync({
              iosClientId: IOS_CLIENT_ID,
              androidClientId: ANDROID_CLIENT_ID,
              scopes: ["profile", "email"],
            });
      
            if (result.type === "success") {
              console.log("LoginScreen.js.js 21 | ", result /* .user.givenName */);
              //login with credentials
              const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
              firebase.auth().signInWithCredential(credential).catch((error) => {
                    console.log(error)
                    alert(error)
                  });


              return result.accessToken;
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            console.log('LoginScreen.js.js 30 | Error with login', e);
            return { error: true };
          }
} 


export const standAloneGoogleLogin=()=> async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()

      
          try {
            await   GoogleSignIn.initAsync({
            });
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user}= await GoogleSignIn.signInAsync();
            
            if (type === 'success') {
                  var credential = firebase.auth.GoogleAuthProvider.credential(
                        user.auth.idToken);
                    // Sign in with credential from the Google user.
                    firebase.auth().signInWithCredential(credential).then(()=>alert(user || 'google user is null')).catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      // The email of the user's account used.
                      var email = error.email;
                      // The firebase.auth.AuthCredential type that was used.
                      var credential = error.credential;
                      // ...
                    });
            }
          } catch ({ message }) {
            alert('login: Error:' + message);
          }
}
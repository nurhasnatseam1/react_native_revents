import {SubmissionError,reset} from 'redux-form';
import { Alert } from 'react-native';
import * as Facebook from 'expo-facebook';



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

              // Sign in with credential from the Facebook user.
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
const ios_client_id='749422515483-j11e3s1sert2ns0pmm06npti9nom0e9o.apps.googleusercontent.com'

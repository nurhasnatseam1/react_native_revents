import {SubmissionError,reset} from 'redux-form';
import { Alert } from 'react-native';
im



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

export const facebookLogin=()=>async (dispathc,getState,{getFirebase,getFirestore})=>{

}
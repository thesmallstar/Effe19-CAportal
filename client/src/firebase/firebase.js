import * as firebase from 'firebase';
import Config from './config';

firebase.initializeApp(Config);

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//       .then(function() {
//       // Existing and future Auth states are now persisted in the current
//       // session only. Closing the window would clear any existing state even
//       // if a user forgets to sign out.
//       // ...
//       // New sign-in will be persisted with session persistence.
//       // return firebase.auth().signInWithEmailAndPassword(email, password);
//       })
//       .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(errorCode);
//       console.log(errorMessage);
// });

export default firebase;

// const email='abc@abc.abc';
// const password='testPassword';

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
      
//       console.log('Error Code',errorCode);
//       console.log('Error Message',errorMessage);
// });

// const database =firebase.database();

// database.ref('users').set({email}).then(()=>{
//       console.log("Success");
// }).catch((e)=>{
//       console.log(e);
// });
    
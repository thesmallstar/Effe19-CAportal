import firebase from "../firebase/firebase";
const facebookSignIn = props => {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      var token = result.credential.accessToken;
      var user = result.user;
      //console.log("Facebook:", user);
      //console.log("Token:", token);
      // props.history.push("/admin/dashboard"); //Redirecting to Dashboard Page.

      firebase.database().ref('Users/'+user.uid.toString()).once('value').then((snapshot)=> {
        //console.log(snapshot.val());
        if(snapshot.val()==null)
        {
          
            firebase.database().ref('Users/'+user.uid).set({
              uid:user.uid,
              score:0,
              uploads:0,
              name:user.displayName
            }).then(()=>{
              //console.log("Initialized User");
            }).catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              //console.log(errorCode);
              //console.log(errorMessage);
            });
        }
        else
        {
          //console.log("Already Initialised");
        }
        props.history.push("/admin/dashboard");
        
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //console.log(errorCode);
        //console.log(errorMessage);
      }); 

    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      //console.log(errorCode);
      //console.log(errorMessage);
      //console.log(email);
      //console.log(credential);
    });
};

export default facebookSignIn;

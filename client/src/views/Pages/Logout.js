import React from 'react';
import firebase from '../../firebase/firebase';

class Logout extends React.Component{

      constructor(props)
      {
            super(props);
            this.LogOut();
      }

      LogOut = () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                // Sign-out successful.
                console.log("Sign-out successful. hereeeeeeee");
                this.props.history.push("/"); //Redirecting to home page.
              })
              .catch(error => {
                // An error happened.
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
        
                console.log("Error Code", errorCode);
                console.log("Error Message", errorMessage);
              });
      };
}

export default Logout;
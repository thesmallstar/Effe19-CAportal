import React from "react";
import PropTypes from "prop-types";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import registerPageStyle from "assets/jss/material-dashboard-react/views/registerPageStyle.jsx";
import firebase from '../../firebase/firebase';
import googleSignIn from "../../lib/googleSignIn";
import facebookSignIn from "../../lib/facebookSignIn";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {},
      accountTaken:false
    };
  }

  // githubAuth = () => {
  //   githubSignIn(this.props);
  // };

  googleAuth = () => {
    googleSignIn(this.props);
  };

  facebookAuth = () => {
    facebookSignIn(this.props);
  };

  register = async e => {
    e.preventDefault();
    
    const { history } = this.props;

    const fields = ["name", "email", "password"];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    ////console.log(formValues);

    firebase
      .auth()
      .createUserWithEmailAndPassword(formValues.email, formValues.password)
      .then(user => {
        //console.log("Registration Successfull!");

        const User = firebase.auth().currentUser;

        // Adding display Name.
        User.updateProfile({
          displayName: formValues.name
        })
          .then(user => {
            // Update successful.
            //console.log("Name Added!");
            //console.log(User);

            firebase.database().ref('Users/'+User.uid.toString()).once('value').then((snapshot)=> {
              //console.log(snapshot.val());
              if(snapshot.val()==null)
              {
                
                  firebase.database().ref('Users/'+User.uid).set({
                    uid:User.uid,
                    score:0,
                    uploads:0,
                    name:User.displayName
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
                ////console.log("Already Initialised");
              }
              
            }).catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              ////console.log(errorCode);
              ////console.log(errorMessage);
            }); 

          })
          .catch(error => {
            // An error happened.
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            ////console.log("Error Code", errorCode);
            ////console.log("Error Message", errorMessage);
          });

        // Sending a verification email.
        ////console.log("Current:", user);
        User.sendEmailVerification()
          .then(() => {
            ////console.log("Verification Email sent");
            this.props.history.push("/auth/login-page"); //Redirecting to Login page.
          })
          .catch(error => {
            // An error happened.
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            ////console.log("Error Code", errorCode);
            ////console.log("Error Message", errorMessage);
          });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode=='auth/email-already-in-use')
        {
            this.setState({
              accountTaken:true
            });
        }

        // console.log("Error Code", errorCode);
        // console.log("Error Message", errorMessage);
      });
  };
  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.register}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Register</h4>
                  <div className={classes.socialLine}>

                    <Button
                      color="transparent"
                      justIcon
                      className={classes.customButtonClass}
                      onClick={this.facebookAuth}
                    >
                      <i className={"fa fa-facebook-square"} />
                    </Button>

                    {/* <Button
                      color="transparent"
                      justIcon
                      className={classes.customButtonClass}
                      onClick={this.githubAuth}
                    >
                      <i className={"fa fa-github"} />
                    </Button> */}

                    <Button
                      color="transparent"
                      justIcon
                      className={classes.customButtonClass}
                      onClick={this.googleAuth}
                    >
                      <i className={"fa fa-google-plus"} />
                    </Button>


                  </div>
                </CardHeader>
                <CardBody>
                {this.state.accountTaken?<p className={classes.cardDescription}> Email already registered try logging in.</p>
                  :<p className={classes.cardDescription}>A verification email will be sent upon successful registration. Please verify so that we can get in touch with you.</p>
                 }
                   <CustomInput
                    labelText="Name..."
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "name",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    error={errors.username}
                    inputProps={{
                      required: true,
                      type: "email",
                      name: "username",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password..."
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    error={errors.password}
                    inputProps={{
                      required: true,
                      name: "password",
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        required
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={
                      <span>
                        I agree with the <a href="#pablo">Privacy Policy</a>.
                      </span>
                    }
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(registerPageStyle)(RegisterPage);

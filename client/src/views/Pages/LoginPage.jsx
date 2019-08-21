import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";
import firebase from '../../firebase/firebase';
import googleSignIn from "../../lib/googleSignIn";
import facebookSignIn from "../../lib/facebookSignIn";
import Loader from 'react-loader-spinner'

// const { REACT_APP_SERVER_URL } = process.env;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {},
      forgot:false,
      isLoading:false
    };
  }

 

  googleAuth = () => {
    this.setState({
      isLoading:true
    });
    googleSignIn(this.props);
  };

  facebookAuth = () => {
    facebookSignIn(this.props);
  };

  // formElement='';
  // passwordReset=()=>{
  //   //console.log("Forgot password");
  //   this.formElement.preventDefault();
  //   this.formElement.submit();
    
  // };

  login = async e => {

    e.preventDefault();

    // const { history } = this.props;

    const fields = ["email", "password"];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

      firebase
      .auth()
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then(user => {
        //console.log(user);
        //console.log("Successfully Logged In!");
        //console.log(firebase.auth().currentUser);
        this.props.history.push("/admin/dashboard"); //Redirecting to Dashboard page.
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        //console.log("Error Code", errorCode);
        //console.log("Error Message", errorMessage);
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


    if (this.state.isLoading) 
    {
      return (
        <div className={classes.container} style={{height:"80vh",width:"100%",display:'flex',justifyContent:'center'}}>
          <Loader
          type="BallTriangle"
          color="white"
          height="80"
          width="80"
          style={{marginTop:"38vh"}}
          />
        </div>
      );
    }
    
    else {
      return (
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
              {/* <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
                Log in to see how you can speed up your web development with out
                of the box CRUD for #User Management and more.{" "}
              </h4> */}
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <form onSubmit={this.login}
              ref={form => {
                      this.formElement = form;
              }}
              >
                <Card className={classes[this.state.cardAnimaton]}>
                  <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="primary"
                  >
                    <h4 className={classes.cardTitle}>Log in</h4>
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
                    <p
                      className={`${classes.textCenter} ${classes.checkboxLabel}`}
                    >
{/*                 
                      {!(this.state.forgot) && <p style={{cursor:'pointer'}} onClick={()=> this.setState({forgot:true})}>Forgot password?</p>}
                      {(this.state.forgot) && <span>Incase you forgot your password enter email and click <span><b style={{cursor:'pointer'}} onClick={this.passwordReset} >here</b></span> to send a password reset email.</span>}
                       */}
                      
                    </p>
                    <CustomInput
                      onChange={()=>{
                        //console.log("Changed");
                      }}
                      labelText="Email..."
                      id="email"
                      error={errors.username || errors.invalidEmailOrPassword}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.formControlClassName
                      }}
                      inputProps={{
                        required: true,
                        name: "username",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      error={errors.password || errors.invalidEmailOrPassword}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.formControlClassName
                      }}
                      inputProps={{
                        type: "password",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    {/* <FormControlLabel
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
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      label={<span>Remember me</span>}
                    /> */}
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
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);

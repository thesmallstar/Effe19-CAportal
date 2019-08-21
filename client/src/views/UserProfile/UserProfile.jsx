import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import firebase from "../../firebase/firebase";
import avatar from "assets/img/faces/marc.jpg";
import Loader from 'react-loader-spinner'
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const { REACT_APP_SERVER_URL } = process.env;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      currentUser: {},
      isLoading:true,
      score:0,
      uploads:0
    };
    this.updateProfile = this.updateProfile.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log("Signed in! ", user.toJSON());
        firebase.database().ref('Users/'+user.uid.toString()).once('value').then((snapshot)=>{
          this.setState({
            currentUser: user,
            isLoading: false,
            score:snapshot.val().score,
            uploads:snapshot.val().uploads
          });
        });
        
        // //console.log('stamp',moment().valueOf());
        this.setState({
          currentUser: user
        });
      } else {
        // User is signed out.
        // ...
        //console.log("Signed out!");
        this.props.history.push("/"); //Redirecting to home page.
      }
    });

  }
  async updateProfile(e) {
    e.preventDefault();

    const fields = ["name", "username"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let registerRequest;
    try {
      registerRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/profile/update-profile-info`,
        {
          ...formValues
        },
        {
          withCredentials: true
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;

    if (!registerRequestData.success) {
      this.setState({
        errors:
          registerRequestData.messages && registerRequestData.messages.errors
      });
    }
  }
  render() {
    const { classes, name, email } = this.props;
    const { errors } = this.state;
    if (this.state.isLoading) {
      return (
        <div style={{height:"80vh",width:"100%",display:'flex',justifyContent:'center'}}>
          <Loader
          type="BallTriangle"
          color="black"
          height="80"
          width="80"
          style={{marginTop:"38vh"}}
          />
        </div>
      );
    }
    else {
    return (
      <div>
        <GridContainer>

        
          {/* <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.updateProfile}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: "name"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: email,
                          name: "username"
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem> */}


          <GridItem xs={12} sm={12} md={6} style={{margin:'0 auto'}}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={this.state.currentUser.photoURL || avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}><b>CAMPUS AMBASSADOR</b></h6>
                <h4 className={classes.cardTitle}>{this.state.currentUser.displayName}</h4>
                <p className={classes.description}>
                 <b>E-Mail</b>
                </p>
                <p className={classes.description}>
                 {this.state.currentUser.email}
                </p>
                <p className={classes.description}>
                 <b>Total Score</b>
                </p>
                <p className={classes.description}>
                 {this.state.score}
                </p>
                <p className={classes.description}>
                 <b>Total Uploads</b>
                </p>
                <p className={classes.description}>
                {this.state.uploads}
                </p>
                <p className={classes.description}>
               Hurry up! and start contributing. 😃
                </p>
                {/* <Button color="primary" round>
                  Follow
                </Button> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withStyles(styles)(UserProfile);

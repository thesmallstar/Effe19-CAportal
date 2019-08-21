import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// import Table from "components/Table/Table.jsx";
// import Tasks from "components/Tasks/Tasks.jsx";
// import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import moment from "moment";
// import { bugs, website, server } from "variables/general.jsx";
import Button from "components/CustomButtons/Button.jsx";
import queryString from "query-string";
import Loader from 'react-loader-spinner'
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import firebase from "../../firebase/firebase";
// import SelectInput from "@material-ui/core/Select/SelectInput";
// import moment from 'moment';

// For notification

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
// import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
// import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class viewTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isLoading: true,
      value: 0,
      Task: {},
      tc: false,
      ImagesToRender: [],
      score:0,
      uploads:0,
      uploading:'notdone'
    };

    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        ////console.log("Signed in! ", user.toJSON());
        firebase.database().ref('Users/'+user.uid.toString()).once('value').then((snapshot)=>{
          


          const imgs = [];
          firebase
            .database()
            .ref("Subs")
            .once("value", snapshot2 => {

              this.setState({
                currentUser: user,
                isLoading: false,
                score:snapshot.val().score,
                uploads:snapshot.val().uploads
              });

              const identity = values.task + this.state.currentUser.uid;
              snapshot2.forEach(child => {
                ////console.log(identity);
                ////console.log(child.val().valid);
                if (child.val().valid.localeCompare(identity) == 0) 
                {
                  const topush =
                    "https://firebasestorage.googleapis.com/v0/b/effe-19ca.appspot.com/o/" +
                    child.val().path +
                    "?alt=media";
                  ////console.log(topush);
                  imgs.push(topush);
                }
              });

        ////console.log(snapshot2);
        this.setState({ ImagesToRender: imgs });
        ////console.log(imgs);
        //////console.log(AllTask);
        // ////console.log("All Tasks:",this.state.allTask);
      });






        });
        // ////console.log('stamp',moment().valueOf());
        // this.setState({
        //   currentUser: user
        // });
        // const identity = values.task + this.state.currentUser.uid;
        // ////console.log(this.state.currentUser.uid);
      } else {
        // User is signed out.
        // ...
        ////console.log("Signed out!");
        this.props.history.push("/"); //Redirecting to home page.
      }


    });

    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    this.fetchTask = this.fetchTask.bind(this);
    // this.fetchAllImages = this.fetchAllImages.bind(this);
    const values = queryString.parse(this.props.location.search);
    this.fetchTask(values.task);

  }

  fetchTask(s) {
    firebase
      .database()
      .ref("TASKS")
      .child(s)
      .once("value").then( snapshot => {
        this.setState({ Task: snapshot.val(), isLoading: false });
        ////console.log(snapshot.val());
      }).catch((e)=>{
        
      });
  }

  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    // Donot use this, depericated function, instead use Constructor.
  }

  inputElement = "";

  uploadImage = e => {

    ////console.log("Debugging:",this.state.currentUser.uid);

    const name = moment()
      .valueOf()
      .toString();
    const values = queryString.parse(this.props.location.search);
    let locs = this.state.currentUser.uid + "/" + name;
    //////console.log(locs);
    const files = e.target.files;
    var blob = new Blob(files, { type: "image/jpeg" });
    var storageRef = firebase.storage().ref(locs);
    this.setState({
      isLoading:true
    });
    storageRef.put(blob).then(snapshot => {
      ////console.log("Uploaded a blob or file!");
       this.setState({
         uploading:'done',
       });
    }).catch((e)=>{

      // For user Notification
      const place = "tc";
      var x = [];
      x[place] = true;
      this.setState(x);
      this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
      );
      return;
      // window.location.reload();
    });
    locs = this.state.currentUser.uid + "%2F" + name;
    ////console.log(locs);
    ////console.log(values.task + this.state.currentUser.uid + locs);
    const identity = values.task + this.state.currentUser.uid;
    firebase
      .database()
      .ref("Subs")
      .push({
        valid: identity,
        path: locs
      })
      .then(() => {
        ////console.log("SuccessFully Added Task to Database");
        let total=this.state.Task.points+this.state.score;
        ////console.log("Updated Points:",total);

        firebase.database().ref('Users/'+this.state.currentUser.uid.toString()).update({
          score:total,
          uploads:this.state.uploads+1
        }).then(()=>{
          ////console.log("Points Updated");
        });
      })
      .catch(e => {

        ////console.log(e);
      });
  };

  imgRender = [];
  // fetchAllImages() {
  //   ////console.log("Running");
  //   var storageRef = firebase.storage().ref(this.state.currentUser.uid);

  //   // Now we get the references of these images
  //   storageRef
  //     .listAll()
  //     .then(result => {
  //       result.items.forEach(imageRef => {
  //         // And finally display them

  //         imageRef
  //           .getDownloadURL()
  //           .then(url => {
  //             ////console.log(url);
  //             this.imgRender.push(url.toString());
  //           })
  //           .catch(error => {
  //             // Handle Errors here.
  //             var errorCode = error.code;
  //             var errorMessage = error.message;

  //             ////console.log("Error Code", errorCode);
  //             ////console.log("Error Message", errorMessage);
  //           });
  //       });
  //       ////console.log(this.imgRender);
  //       ////console.log("go please");
  //       // return imgRender.length;
  //       // this.setState({
  //       //   ImagesToRender:imgRender
  //       // });
  //     })
  //     .catch(error => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;

  //       ////console.log("Error Code", errorCode);
  //       ////console.log("Error Message", errorMessage);
  //     });
  // }

  render() {
    const { classes } = this.props;

    if (this.state.isLoading) return (<div>
       <div style={{height:"80vh",width:"100%",display:'flex',justifyContent:'center'}}>
        <Loader
        type="BallTriangle"
        color="black"
        height="80"
        width="80"
        style={{marginTop:"38vh"}}
        />
      </div>
      {this.state.uploading=='done' && window.location.reload()}
    </div>);
    else {
      return (
        <div>
          {/* {this.fetchAllImages()} */}

          <GridContainer>
            <GridItem xs={12} sm={12} md={14}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    {this.state.Task.task}
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    Points for this Task:<b> {this.state.Task.points}</b>
                  </p>
                </CardHeader>
                {/* // <button>Submit</button> */}
                <CardBody>

                <p><b>Post to Share:</b><br></br> <a href={this.state.Task.note} target='_blank'>{this.state.Task.note}</a></p>


                  {/* For uploading */}
                  <input
                    type="file"
                    id="upload"
                    name="fileupload"
                    multiple
                    onChange={e => this.uploadImage(e)}
                    ref={input => {
                      this.inputElement = input;
                    }}
                    style={{ display: "none" }}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    simple
                    size="lg"
                    block
                    onClick={() => this.inputElement.click()}
                  >
                    UPLOAD
                  </Button>
                  {/* For notification */}
                  <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message="Image Upload unsuccessful, please try again."
                    open={this.state.tc}
                    closeNotification={() => this.setState({ tc: false })}
                    close
                  />
                  Previous Submissions:
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {/* {////console.log("HEre:",this.fetchAllImages())} */}

                    {this.state.ImagesToRender.map((url, ind) => (
                      <img
                        src={url.toString()}
                        alt="image"
                        style={{ width: "265px", margin: "10px",height:'400px' }}
                      />
                    ))}
                    {/* {this.fetchAllImages()} */}
                    {/* <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/effe19.appspot.com/o/0HHb8B4wzAfI5UrUoDxbUMaQtKi2%2F1565797516874?alt=media&token=cd2730dd-48a5-4ecd-967f-ea04413a2f26"
                      }
                      alt="image"
                      style={{ width: "300px", margin: "30px" }}
                    /> */}
                  </div>
                  {/*
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Base points", "Date"]}
                  tableData={[["1","Dhairya Patel","10","sdfijdsofi"]]}
                /> */}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

viewTask.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(viewTask);

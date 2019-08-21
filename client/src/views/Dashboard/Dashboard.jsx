import React from "react";
import PropTypes from "prop-types";
import Loader from 'react-loader-spinner'
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Face";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Grade";
import Whatshot from "@material-ui/icons/Whatshot";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import moment from "moment";
import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import firebase from "../../firebase/firebase";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isLoading: true,
      value: 0,
      allTask: [],
      score:0
    };
    // Authenticating and setting up session.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // //console.log("Signed in");
        //console.log("Signed in! ", user.toJSON());

        firebase.database().ref('Users/'+user.uid.toString()).once('value').then((snapshot)=>{
          this.setState({
            currentUser: user,
            isLoading: false,
            score:snapshot.val().score
          });
        });

      } else {
        // User is signed out.
        // ...
        //console.log("Signed out!");
        this.props.history.push("/"); //Redirecting to home page.
      }
    });
    // Fetching task list from database.
    firebase
      .database()
      .ref("TASKS")
      .once("value").then(snapshot => {

        // //console.log('Tasks:',snapshot.val());
        const AllTask = [],taskID = [];
        var i = 1;
        snapshot.forEach(child => {
          AllTask.push([
            i,
            child.val().task,
            child.val().points,
            moment(child.val().createdAt).format("MMMM Do, YYYY"),
            "viewTask?task=" + child.key
          ]);
          taskID.push(child.key);
          //console.log(child.key);
          i++;
        });
        this.setState({
          allTask: AllTask,
          isLoading:false
        }) ;
        ////console.log(AllTask);
        // //console.log("All Tasks:",this.state.allTask);
      });    
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;

    if (this.state.isLoading) 
    {
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
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Whatshot/>
                  </CardIcon>
                  <p className={classes.cardCategory}>Total Score</p>
                  <h3 className={classes.cardTitle}>{this.state.score}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Hurry up ! Start completing tasks to win exciting prizes.
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>Footfall</p>
                  <h3 className={classes.cardTitle}>+25000</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>Effervescence-18</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Update/>
                  </CardIcon>
                  <p className={classes.cardCategory}>Edition</p>
                  <h3 className={classes.cardTitle}>17th</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    {/* <LocalOffer /> */}
                    Effervescence-19
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Followers</p>
                  <h3 className={classes.cardTitle}>+37000</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Just Updated
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {/* <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    data={dailySalesChart.data}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Daily Sales</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                      <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                    </span>{" "}
                    increase in today sales.
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem> */}
            {/* <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="warning">
                  <ChartistGraph
                    className="ct-chart"
                    data={emailsSubscriptionChart.data}
                    type="Bar"
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                  <p className={classes.cardCategory}>
                    Last Campaign Performance
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem> */}
            {/* <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="danger">
                  <ChartistGraph
                    className="ct-chart"
                    data={completedTasksChart.data}
                    type="Line"
                    options={completedTasksChart.options}
                    listener={completedTasksChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  <p className={classes.cardCategory}>
                    Last Campaign Performance
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem> */}
          </GridContainer>
          {/* <GridContainer>
            <GridItem xs={12} sm={12} md={14}>
              <CustomTabs
                title="Tasks:"
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Attempted",
                    // tabIcon: BugReport,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[0, 3]}
                        tasksIndexes={[0, 1, 2, 3]}
                        tasks={bugs}
                      />
                    )
                  },
                  {
                    tabName: "Not Attempted",
                    // tabIcon: Code,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[0]}
                        tasksIndexes={[0, 1]}
                        tasks={website}
                      />
                    )
                  }
                  // ,
                  // {
                  //   tabName: "Server",
                  //   tabIcon: Cloud,
                  //   tabContent: (
                  //     <Tasks
                  //       checkedIndexes={[1]}
                  //       tasksIndexes={[0, 1, 2]}
                  //       tasks={server}
                  //     />
                  //   )
                  // }
                ]}
              />
            </GridItem>
          </GridContainer> */}
          <GridContainer>
            <GridItem xs={12} sm={12} md={14}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>All Tasks</h4>
                  <p className={classes.cardCategoryWhite}>
                    New tasks will appear at the end of the table.
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["ID", "Name", "Points", "Date", "Activity"]}
                    tableData={this.state.allTask}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);

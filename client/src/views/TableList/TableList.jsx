import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Loader from 'react-loader-spinner'
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import firebase from "../../firebase/firebase";
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

class TableList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isLoading: true,
      users:[],
      usersd:[],
      score:0
    };

    // Authenticating and setting up session.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log("Signed in! ", user.toJSON());

        firebase.database().ref('Users').once('value').then((snapshot)=>{
          
          let userData=[];
          snapshot.forEach((child)=>{
            // //console.log(child.toJSON());
            userData.push({
              id:child.val().uid,
              score:child.val().score,
              uploads:child.val().uploads,
              name:child.val().name
            });
          });
          //console.log(userData);
          // Fake data
          userData=userData.concat([
            {id:"-1",name:"Nirmal Chandra",score:0,uploads:0},
            {id:"-1",name:"Manoj Saurabh Lalla",score:0,uploads:0},
            {id:"-1",name:"Priyanka Gagrani",score:0,uploads:0},
            {id:"-1",name:"Aayushman Tiwari",score:0,uploads:0},
            {id:"-1",name:"Nawab Ravel",score:0,uploads:0},
            {id:"-1",name:"Aastha Ganesh",score:0,uploads:0},
            {id:"-1",name:"Abhinav Singh Aurora",score:0,uploads:0},
            {id:"-1",name:"Jyoti Thakkar",score:0,uploads:0},
            {id:"-1",name:"Binod Dara",score:0,uploads:0},
            {id:"-1",name:"Radhe Tiwari",score:0,uploads:0},
            {id:"-1",name:"Dipti Chaudhari",score:0,uploads:0},
            {id:"-1",name:"Ratan Grewal",score:0,uploads:0},
            {id:"-1",name:"Ankita Mangal",score:0,uploads:0},
          ]);
          //console.log(userData);

          userData.sort((a,b)=>{
            return a.score<b.score?1:-1;
          });
          
          userData=userData.map((a,ind)=>{
            return [ind+1,a.name,a.uploads,a.score]
          });
          this.setState({
            isLoading: false,
            users:userData,
            currentUser:user
          });

          
          //console.log(user);
        });
      } else {
        // User is signed out.
        // ...
        //console.log("Signed out!");
        this.props.history.push("/"); //Redirecting to home page.
      }
    });


    
  };
 
  render(){
    const { classes } = this.props;
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
           <GridItem xs={12} sm={12} md={12}>
             <Card>
               <CardHeader color="primary">
                 <h4 className={classes.cardTitleWhite}>Leaderboard</h4>
                 <p className={classes.cardCategoryWhite}>
                   Higher the position greater the chances to win exciting prizes.
                 </p>
               </CardHeader>
               <CardBody>
                 <Table
                   tableHeaderColor="primary"
                   tableHead={["Rank", "Name", "Uploads", "Points"]}
                   currentUser={this.state.currentUser.displayName}
                   tableData={
                    this.state.users
                  //     [
                  //    ["  1", "Dakota Rice", 23, 100],
                  //    ["  1", "Dakota Rice", 23, 100],
                  //    ["  1", "Dakota Rice", 23, 100],
                  //    ["  1", "Dakota Rice", 23, 100],
                  //    ["  1", "Dakota Rice", 23, 100]
                  //  ]
                   
                   }
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

export default withStyles(styles)(TableList);

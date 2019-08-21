import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Quote from "components/Typography/Quote.jsx";
import Muted from "components/Typography/Muted.jsx";
import Primary from "components/Typography/Primary.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success.jsx";
import Warning from "components/Typography/Warning.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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
function TypographyPage(props) {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Message</h4>
        <p className={classes.cardCategoryWhite}>
          To all Campus Ambassadors
        </p>
      </CardHeader>
      <CardBody>
        {/* <div className={classes.typo}>
          <div className={classes.note}>Header 1</div>
          <h1>The Life of Material Dashboard</h1>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 2</div>
          <h2>The Life of Material Dashboard</h2>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 3</div>
          <h3>The Life of Material Dashboard</h3>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 4</div>
          <h4>The Life of Material Dashboard</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 5</div>
          <h5>The Life of Material Dashboard</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 6</div>
          <h6>The Life of Material Dashboard</h6>
        </div> */}


        <div >
          {/* <div className={classes.note}>Paragraph</div> */}
          <p style={{textAlign:'left'}}>
          <h5>Greetings Ambassadors,<br></br><br></br>

            We are pleased to announce that the campus ambassador web app is ready and deployed. This app will be used by all the campus ambassadors, so that all of you can keep us informed regarding your progress as campus ambassadors.

            <br></br><br></br>
            Following are the rules and guidelines pertaining to the app, which have to be taken care of:
              <ol>
                <li>You are supposed to log in using your valid email,gmail or facebook account.</li>
                <li>In case you opt for logging in via email, you need to manually verify your email address.</li>
                <li>After logging in, you will be taken to the dashboard, where there will be tasks set by the organising committee.</li>
                <li>After the tasks are set, you have to start sharing the posts, the links to which you can find after clicking the <b>submit button</b>.</li>
                <li>You will <b>upload</b> the screenshots of your sharing by clicking the upload button given in the page.  This will increase your score.</li>
                <li>The Leaderboard is located in the left menu, showing where you stand against other campus ambassadors. </li>
                <li>The works of the all campus  ambassadors will be manually monitored by our developer team, so kindly refrain from any malpractices. Defaulters will have to face <b>immediate disqualification</b> and their account will be banned.</li>
              </ol>

              Thus, we request you to kindly abide by the above rules and help making this edition of Effervescence a grand success. Lots of perks await for the campus ambassador who prevails. We wish you all the luck, and hope that you carry out your responsibilities with the best of your abilities, and help us in making this festival a grand success.
              <br></br><br></br><br></br>
              Thanks and regards,
              <br></br>
              <i>Team Effervescence</i>
          </h5>
          </p>
        </div>






        {/* <div className={classes.typo}>
          <div className={classes.note}>Quote</div>
          <Quote
            text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."
            author=" Kanye West, Musician"
          />
        </div> */}
        {/* <div className={classes.typo}>
          <div className={classes.note}>Muted Text</div>
          <Muted>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Muted>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Primary Text</div>
          <Primary>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Primary>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Info Text</div>
          <Info>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Info>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Success Text</div>
          <Success>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Success>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Warning Text</div>
          <Warning>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Warning>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Danger Text</div>
          <Danger>
            I will be the leader of a company that ends up being worth billions
            of dollars, because I got the answers...
          </Danger>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Small Tag</div>
          <h2>
            Header with small subtitle
            <br />
            <small>Use "Small" tag for the headers</small>
          </h2>
        </div> */}
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(TypographyPage);

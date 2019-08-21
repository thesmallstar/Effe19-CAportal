import React,{useRef, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location';
import firebase from '../../firebase/firebase';

import "./styles/castyle.scss";
import "./styles/landing.scss";
import "./styles/materialize.scss"
import img1 from "../../assets/images/ca/effe.png";
import img2 from "../../assets/images/back.jpg";
import img3 from "../../assets/images/ca/37811295_2096965080374205_4625127831544791040_n.jpeg";
import img4 from "../../assets/images/ca/tickets.jpg";
import img5 from "../../assets/images/ca/37831874_2096961243707922_2127322938368589824_n.jpeg";
import img6 from "../../assets/images/zebronics.jpg";
// import img7 from "";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const useMountEffect = (fun) => useEffect(fun, []);

const LandingPage=()=>{

  const ROLE=useRef(null);
  const CONTACT=useRef(null);
  const INCEN=useRef(null);
  useMountEffect(() => scrollToRef(ROLE)); // Scroll on mount
  useMountEffect(() => scrollToRef(CONTACT));
  useMountEffect(() => scrollToRef(INCEN));

      
  if(useLastLocation() && useLastLocation().pathname.startsWith('/admin/'))
  {
    // if last location is dashboard then sign out.
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        // console.log("Sign-out successful. at home");
      })
      .catch(error => {
        // An error happened.
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Error Code", errorCode);
        console.log("Error Message", errorMessage);
    });
  }
      
      
  return (

        <div id='only-Landing'>
              {/* <h1>Welcome To CA programme!</h1>
              <button><Link to='/auth/login-page'>Log In</Link></button>
              <button><Link to='/auth/register-page'>Register</Link></button> */}


              
              <nav>
                <div className="nav-wrapper" style={{marginLeft: "3% ",marginRight: "3%"}}>
                  <a id="logo-container" href="https://effe.org.in" className="brand-logo"><img style={{height:"60px",width:"60px"}} src={img1}/></a>
                  <a className="navbar-brand" style={{paddingLeft:"6%",color:"white",fontFamily: "Saira, sans-serif",fontSize:"25px",transition: "all 100ms ease-in-out"}} href="https://effe.org.in">Effervescence'19</a>
                  {/* <button style={{color: "white"}} data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></button> */}

                  <ul className="right hide-on-med-and-down" style={{fontFamily: "Saira, sans-serif"}}>

                    <li><button style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(ROLE)}>Roles</button></li>
                    <li><button  style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(INCEN)} >Incentives</button></li>
                    <li><button  style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(CONTACT)}>Contact</button></li>
                  </ul>
                </div>
              </nav>

            <ul className="sidenav black" id="mobile-demo">
              <br/>
              <a id="logo-container" href="https://effe.org.in" className="brand-logo"><img style={{height:"60px",width:"60px"}} src={img1}/></a>
              <a className="navbar-brand" style={{paddingLeft:"6%",color:"white",fontFamily:"Saira, sans-serif",fontSize:"25px",transition: "all 100ms ease-in-out"}} href="https://effe.org.in">Effervescence'19</a>
                    <li><button style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(ROLE)}>Roles</button></li>
                    <li><button  style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(INCEN)} >Incentives</button></li>
                    <li><button  style={{color: "white",background:'rgba(0,0,0,0)',border:'none',cursor:'pointer'}} onClick={()=>scrollToRef(CONTACT)}>Contact</button></li>
            </ul>

          <div id="index-banner" className="parallax-container">
            <div className="section no-pad-bot">
              <div className="container">
                <br/><br/>

                <h1 className="header center white-text text-lighten-2 intro" style={{fontFamily:"Saira,sans-serif"}}>Campus Ambassador</h1>
                <div className="row center">
                  <h5 className="header col s12 light" style={{fontFamily:"Saira,sans-serif"}}>Register Now to be part of north's greatest fest!</h5>
                </div>
                <div className="row center">
                  <a  id="download-button" style={{fontFamily:"Saira,sans-serif"}} className="btn-large waves-effect waves-light black lighten-1"><Link style={{color:'white'}} to='/auth/register-page'>Register</Link></a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <a  id="download-button" style={{fontFamily:"Saira,sans-serif"}} className="btn-large waves-effect waves-light black lighten-1"><Link style={{color:'white'}} to='/auth/login-page'>Log In</Link></a>
                </div>
                <br/><br/>
              </div>
            </div>
            <div className="parallax"><img style={{opacity:"1",transform:"translate3d(-50%, -50px, -1px)"}} src={img2} alt="Unsplashed background img 1"/></div>
          </div>


  <div className="container">
    <div className="section">
		<div className="row">
        <div className="col s12 center">
          <h3><i className="mdi-content-send brown-text"></i></h3>
          <h4>About CA Program</h4>
          <p className="left-align light">The CR system of Effervescence,IIIT Allahabad plays an integral part in its growth and promotions. It serves as a platform for binding Effervescence with the students across the country as well as imbibing their culture in our festival.

It provides an opportunity to college students across the nation to stand out from multitude of people by being our voice in their respective colleges and thereby significantly bridging the gap between the two.

So do register ,by associating with us as College Ambassadors and thereby moulding this edition of Effervescence bigger and glorious than ever before.</p>
        </div>
      </div>

      <div className="row shadow" id="roles" ref={ROLE}>
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center green-text"><i className="material-icons">group</i></h2>
            <h5 className="center">Participation</h5>

            <p className="light">It is only the Campus Ambassadors who are responsible to refer other CA to the team Effervescence.Encourage and motivate the people around to register and to show active participation in the EFFE events.</p>
          </div>
        </div>

        <div className="col s12 m4" >
          <div className="icon-block">
            <h2 className="center  red-text"><i className="material-icons">camera_alt</i></h2>
            <h5 className="center">Social Media</h5>

            <p className="light">Promoting Effervescence,IIIT Allahabad on various other social platforms like Twitter,Instagram and even various Facebook and Whatsapp groups.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center purple-text"><i className="material-icons">location_city</i></h2>
            <h5 className="center">Multicity</h5>

            <p className="light">The CAs are expected to coordinate with the EFFE team and help us conduct the multicity program in your city(if selected) along with managing public relations with Effervescence.</p>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div className="container" id="incentives"  ref={INCEN}>
    <div className="section">

      <div className="row">
        <div className="col s12 m12 l12 center">
          <h3><i className="mdi-content-send brown-text"></i></h3>
          <h4>Incentives</h4>
        </div>
      </div>
		
			
		<div className="row center">
          <div className="col s12 m6 l3">

            <div className="card small">
                    <div className="card-image" style={{height: "80%"}}>
                      <img height="100%" src={img3} />
                    </div>
                    <div className="card-content">
                      <p>Certificates</p>
                    </div>
            </div>
			</div>
          <div className="col s12 m6 l3">
            <div className="card small">
                    <div className="card-image" style={{height: "80%"}}>
                      <img height="100%" src={img4}/>
                    </div>
                    <div className="card-content">
                      <p>Pronite Passes</p>
                    </div>
            </div>
            
			</div>
          <div className="col s12 m6 l3">

            <div className="card small">
                    <div className="card-image" style={{height: "80%"}}>
                      <img height="100%" src={img5} />
                    </div>
                    <div className="card-content">
                      <p>Internship Opportunity</p>
                    </div>
            </div>
			</div>
          <div className="col s12 m6 l3">
            <div className="card small">
                    <div className="card-image" style={{height: "80%"}}>
                      <img  height="100%" src={img6}/>
                    </div>
                    <div className="card-content">
                      <p>Zebronics Goodies</p>
                    </div>
            </div>
			</div>
					</div>
					</div>
            </div>


        <footer className="page-footer black">
          <div className="container" id="contact"  ref={CONTACT}>
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Effervescence</h5>
                <p className="grey-text text-lighten-4">Effervescence is the annual cultural fest of IIIT Allahabad and one of the greatest fests of the north.</p>
              </div>
              <div className=" col l6 s12" style={{textAlign:"right"}}>
                <ul>
                  <li style={{display:"inline",padding:"15px"}}><a className="blue-text" href="https://www.facebook.com/effervescence.iiita/"><i className="fab fa-facebook fa-2x"></i></a></li>
                  <li style={{display:"inline",padding:"15px"}}><a className="light-blue-text" href="https://twitter.com/goeffervescence?lang=en"><i className="fab fa-twitter fa-2x"></i></a></li>
                  <li style={{display:"inline",padding:"15px"}}><a className="red-text" href="https://instagram.com/goeffervescence"><i className="fab fa-instagram fa-2x"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              <a style={{color:'white'}} href="mailto:effervescence@iiita.ac.in ">effervescence@iiita.ac.in </a><br></br>
              Festival Coordinators:<br></br>
              Yash Raj +(91)9934653679 <br></br>
              Pranav Jhawar +(91)8233811917
              </div>
          </div>
        </footer>











        </div>

  );
};

export default LandingPage;
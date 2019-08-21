// import React from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// const CustomSkinMap = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
//       defaultOptions={{
//         scrollwheel: false,
//         zoomControl: true,
//         styles: [
//           {
//             featureType: "water",
//             stylers: [
//               { saturation: 43 },
//               { lightness: -11 },
//               { hue: "#0088ff" }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.fill",
//             stylers: [
//               { hue: "#ff0000" },
//               { saturation: -100 },
//               { lightness: 99 }
//             ]
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.stroke",
//             stylers: [{ color: "#808080" }, { lightness: 54 }]
//           },
//           {
//             featureType: "landscape.man_made",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ece2d9" }]
//           },
//           {
//             featureType: "poi.park",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ccdca1" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.fill",
//             stylers: [{ color: "#767676" }]
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.stroke",
//             stylers: [{ color: "#ffffff" }]
//           },
//           { featureType: "poi", stylers: [{ visibility: "off" }] },
//           {
//             featureType: "landscape.natural",
//             elementType: "geometry.fill",
//             stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
//           },
//           { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.sports_complex",
//             stylers: [{ visibility: "on" }]
//           },
//           { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.business",
//             stylers: [{ visibility: "simplified" }]
//           }
//         ]
//       }}
//     >
//       <Marker position={{ lat: 25.4299, lng: 81.7712 }} />
//     </GoogleMap>
//   ))
// );


import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
 
// // ES5
// var ReactMapboxGl = require("react-mapbox-gl");
// var Layer = ReactMapboxGl.Layer;
// var Feature = ReactMapboxGl.Feature;
 
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWZmZXJ2ZXNjZW5jZS0xOSIsImEiOiJjanpmZGRiZXAwYmFuM29zOWRybzB3cHRyIn0.yRS9YBIfjwPhrvzw50TZWw"
});




function Maps({ ...props }) {
  return (
    // <CustomSkinMap
    //   googleMapURL="https://maps.googleapis.com/maps/api/js?key=API_KEY"
      
    //   loadingElement={<div style={{ height: `100%` }} />}
    //   containerElement={<div style={{ height: `100vh` }} />}
    //   mapElement={<div style={{ height: `100%` }} />}
    // />

    <Map
    style="mapbox://styles/mapbox/streets-v9"
    center={[81.7712,25.4299]}
    zoom={[16]}
    containerStyle={{
      height: "100vh",
      width: "100vw"
    }}>
    >
   
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}>
        {/* <Feature coordinates={[0,0]}/> */}
      </Layer>
  </Map>

  );
}

export default Maps;

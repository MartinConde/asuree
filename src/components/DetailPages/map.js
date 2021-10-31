// import React from "react"
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
// import "leaflet-providers/leaflet-providers.js"
// import L from "leaflet"
// import { isDomAvailable } from "../../lib/util"
// import MarkerIcon from '../../static/icons/map-marker.svg'


// const myIcon = new L.Icon({
//     iconUrl: MarkerIcon,
//     iconRetinaUrl: MarkerIcon,
//     popupAnchor:  [-0, -0],
//     iconSize: [32,45],     
// });




// export default function Map({ position }) {
//   if (!isDomAvailable()) {
//     return (
//       <div>
//         <p className="map-loading">Loading map...</p>
//       </div>
//     )
//   }

//   return (
//     <div style={{ height: "500px", width: "100%" }} key={Math.random()}>
//       <MapContainer
//         style={{ height: "500px", width: "100%" }}
//         center={position}
//         zoom={16}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=QxQCRNip9Lu8xBqNLWXqMNVFO7dgHdrYixcz8ddyEhiUqIPaqgnZJTBw8U5qXnBL"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   )
// }

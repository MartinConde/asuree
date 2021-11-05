import React from "react"
import { GoogleMap, useJsApiLoader, Marker, Circle } from "@react-google-maps/api"
import MapMarker from '../../static/icons/locationMarker.svg'

const containerStyle = {
  width: "100%",
  height: "400px",
}

const test =[
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#0cb2f7"
            },
            {
                "saturation": "0"
            },
            {
                "weight": "0.01"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#0cb2f7"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#000033"
            },
            {
                "visibility": "on"
            }
        ]
    }
]

function GMap({ latitude, longitude, zoom }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD4XVCuSAeEathZN0B84lSp3b3PQ0FKL7Q",
    language: 'de_DE'
  })

  const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(0,0)
//     map.fitBounds(bounds)
//     setMap(map)
//   }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={{styles: test}}
      center={{ lat: latitude, lng: longitude }}
      zoom={zoom ? zoom : 18}
    //   onLoad={onLoad}
      onUnmount={onUnmount}
    >
         <Circle options={{
    strokeColor: 'rgba(12, 178, 247, 1)',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: 'rgba(12, 178, 247, 0.46)',
    fillOpacity: 0.35,
    center: {
      lat: latitude,
      lng: longitude,
    },
    radius: 20,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: -1,
  }} />
      <Marker
    style={{width: "5px"}}
        icon={MapMarker}
        scale={12}
        position={{ lat: latitude, lng: longitude }}
        anchor= {{ x: 45, y: 15} }
      />
      {/* <Marker
        position={{ lat: latitude, lng: longitude }}
      /> */}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(GMap)

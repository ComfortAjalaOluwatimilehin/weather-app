import React from "react"
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import mapstyles from "./mapstyles.json"



const Map =withScriptjs(withGoogleMap((props)=>{
    return(

      <GoogleMap
          defaultZoom={5}
          center={props.center}
          defaultOptions={{ styles: mapstyles }}
          onClick={props.handleMapClick}
          >
           {props.isMarkerShown && <Marker position={props.center} />}
    </GoogleMap>
    )
}
))


export default Map

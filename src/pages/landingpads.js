import React from "react"
import {graphql, Link} from 'gatsby'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { Helmet } from "react-helmet"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SEO from "../components/seo";
import Layout from "../components/layout";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LandingPads = ({data}) => {
  const bounds = data.spacexapi.landpads.map(landpad => {
    const {location: {longitude, latitude}} = landpad;
    return [latitude, longitude];
  });

  if (typeof window === 'undefined') {
    return;
  }

  return (
    <Layout>
      <SEO title="SPACEX LANDING PADS" />
      <h1>SpaceX landing pads</h1>
      <Helmet>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
      </Helmet>
      <LeafletMap bounds={bounds} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {data.spacexapi.landpads.map(landpad => {
          const {
            location: {longitude, latitude, region},
            full_name, id, attempted_landings, successful_landings,
            status, landing_type, wikipedia
          } = landpad;
          const position = [
            latitude,
            longitude
          ];
          return (
            <Marker key={id} position={position}>
              <Popup>
                <b><a href={wikipedia} target={'_blank'}>{full_name}</a></b><br/>
                Status: {status}<br/>
                Region: {region}<br/>
                Attempted landings: {attempted_landings}<br/>
                Successful landings: {successful_landings}<br/>
                Type: {landing_type}<br/>
              </Popup>
            </Marker>
          )
        })}
      </LeafletMap>
      <Link to="/">Home page</Link>
    </Layout>
  );
};

export const query = graphql`
  query {
    spacexapi {
      landpads {
        location {
          latitude
          longitude
          name
          region
        }
        full_name
        status
        attempted_landings
        details
        successful_landings
        wikipedia
        id
        landing_type
      }
    }
  }
`;

export default LandingPads
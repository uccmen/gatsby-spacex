import React from "react"
import {graphql, Link} from "gatsby";
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

const LaunchPads = ({data}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const bounds = data.spacexapi.launchpads.map(launchpad => {
    const {location: {longitude, latitude}} = launchpad;
    return [latitude, longitude];
  });

  return (
    <Layout>
      <SEO title="SPACEX LAUNCH PADS" />
      <h1>SpaceX launch pads</h1>
      <Helmet>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
      </Helmet>
      <LeafletMap bounds={bounds} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {data.spacexapi.launchpads.map(launchpad => {
          const {
            location: {longitude, latitude, region},
            name, id, attempted_launches, successful_launches,
            status, wikipedia
          } = launchpad;
          const position = [
            latitude,
            longitude
          ];
          return (
            <Marker key={id} position={position}>
              <Popup>
                <b><a href={wikipedia} target={'_blank'}>{name}</a></b><br/>
                Status: {status}<br/>
                Region: {region}<br/>
                Attempted launches: {attempted_launches}<br/>
                Successful launches: {successful_launches}<br/>
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
      launchpads {
        location {
          latitude
          longitude
          name
          region
        }
        name
        attempted_launches
        details
        id
        status
        successful_launches
        wikipedia
      }
    }
  }
`;

export default LaunchPads
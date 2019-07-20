import React from "react"
import {graphql, Link} from "gatsby";
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import SEO from "../components/seo";
import Layout from "../components/layout";

const Ships = ({data}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const bounds = data.spacexapi.ships.map(ship => {
    const {position: {longitude, latitude}} = ship;
    return [latitude || 24.8036904, longitude || -81.7718049];
  });

  return (
    <Layout>
      <SEO title="SPACEX SHIPS" />
      <h1>SpaceX ships</h1>
      <LeafletMap bounds={bounds} zoom={12} draggable={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {data.spacexapi.ships.map(ship => {
          const {
            position: {longitude, latitude},
            name, image, status,
            year_built, home_port, weight_kg, type, url, id
          } = ship;
          const position = [
            latitude || 24.8036904,
            longitude || -81.7718049
          ];
          return (
            <Marker key={id} position={position}>
              <Popup>
                <a href={image} target={'_blank'}><img src={image} alt={name} height={'100%'} width={'100%'}/></a>
                <b><a href={url} target={'_blank'}>{name}</a></b><br/>
                Status: {status}<br/>
                Year built: {year_built}<br/>
                Port: {home_port}<br/>
                Weight(kg): {weight_kg}<br/>
                Type: {type}<br/>
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
      ships {
        position {
          latitude
          longitude
        }
        name
        image
        status
        year_built
        home_port
        weight_kg
        type
        url
        id
      }
    }
  }
`;

export default Ships
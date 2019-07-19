import React from "react"
import {graphql, Link as GatsbyLink} from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";
import moment from "moment";

const Launches = ({data}) => {
  return (
    <Layout>
      <SEO title="SPACEX LAUNCH PADS" />
      <h1>SpaceX launches</h1>
      <ul>
        {data.spacexapi.launches.map(launch => {
          const {id, details, mission_name, links: {video_link}, launch_date_utc} = launch;

          return (
            <li key={id}>
              <b>{mission_name}</b>: {moment(launch_date_utc).fromNow()}
              <p>
                {details}
              </p>
              <iframe title={mission_name}
                      width={560}
                      height={315}
                      src={video_link && video_link.replace('watch?v=', 'embed/')}
                      frameBorder={0}
                      allow={"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}
                      allowFullScreen={true}
              >
              </iframe>
            </li>
          );
        })}
      </ul>
      <GatsbyLink to="/">Home page</GatsbyLink>
    </Layout>
  )
};

export const query = graphql`
  query {
    spacexapi {
      launches(limit: 10, sort: "launch_date_utc", order: "ASC") {
        links {
          flickr_images
          video_link
        }
        mission_name
        id
        launch_date_utc
        details
      }
    }
  }
`;

export default Launches
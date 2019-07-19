import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to my Gatsby PlayDay <a href={'https://github.com/uccmen/gatsby-spacex'}>project</a>.</p>
    <p>Pages below contains unofficial SpaceX data queried with GraphQL at<span> </span>
       <a href={'https://github.com/spacexland/api'}>https://api.spacex.land/graphql/</a>
    </p>
    <ul>
      <li><Link to="/landingpads/">Landing pads</Link></li>
      <li><Link to="/launchpads/">Launch pads</Link></li>
      <li><Link to="/launches/">Launches</Link></li>
      <li><Link to="/ships/">Ships</Link></li>
    </ul>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem`, display: 'float' }}>
      <Image />
    </div>
  </Layout>
);

export default IndexPage

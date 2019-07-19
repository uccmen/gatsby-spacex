import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <ul>
      <li><Link to="/page-2/">Go to page 2</Link></li>
      <li><Link to="/launchpads/">Launch pads</Link></li>
      <li><Link to="/landingpads/">Landing pads</Link></li>
      <li><Link to="/ships/">Ships</Link></li>
    </ul>
  </Layout>
);

export default IndexPage

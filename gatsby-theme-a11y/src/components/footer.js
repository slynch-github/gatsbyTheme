import React from "react"
//  import { FaTwitter, FaLinkedinIn, FaRegEnvelope } from "react-icons";
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid, Styled, Input, Button, Box, NavLink, Flex, Container } from 'theme-ui'


class Footer extends React.Component {
  render() {
    console.log("this.props", this.props)
    const { myEmail, myTwitter, myLinkedIn } = this.props.data.site.siteMetadata.social
 

    return (
  <footer>
  
   <div sx={{
      mx: 'auto', textAlign: "center"
    }}>
      <div><em>Connect with me!</em></div>


      <Flex as='nav' aria-label="social" sx={{alignItems: "center", justifyContent: "center", marginLeft: "-40px"}}>
  <ul sx={{listStyleType: "none"}}>
    <li sx={{display: "inline-block"}}>
  <NavLink variant="socialNav" href={"mailto:" + myEmail} aria-label="Email" p={20}>
    <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
  </NavLink>
  </li>
  <li sx={{display: "inline-block"}}>
  <NavLink variant="socialNav" href={"https://twitter.com/" + myTwitter} aria-label="Twitter" p={20}>
    <FontAwesomeIcon icon={faTwitter} aria-hidden="true" />
  </NavLink>
  </li>
  <li sx={{display: "inline-block"}}>
  <NavLink variant="socialNav" href={"https://www.linkedin.com/in/" + myLinkedIn} aria-label="LinkedIn" p={20}>
   <FontAwesomeIcon icon={faLinkedinIn} aria-hidden="true" />
  </NavLink>
  </li>
  </ul>
</Flex>
      
    <div sx={{marginBottom: "30px"}}>
      © {new Date().getFullYear()} Built with
          {` `}
          <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a>
 </div>
 </div>
 
  </footer>
)

}
}


export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            social
            {
              myTwitter
              myLinkedIn
              myEmail
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} {...props} />}
  />
)
Footer.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
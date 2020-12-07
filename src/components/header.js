import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
`

// color: black;
const NavLink = styled(Link)`
  color: white;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--font-after);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const HomeLink = styled(NavLink)`
  margin-left: 0;
`

const SiteHeader = styled.header`
  // background: transparent;
  background-color: var(--background-secondry);
  display: flex;
  align-content: center;

  justify-content: center;

  width: 100%;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
`

const IconLink = styled.a`
  padding: 0.5rem;
`

const Header = (x) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedIn
          }
        }
      }
    }
  `)

  return (
    <div>
      <div style={{ textAlign: "center", margin: 10 }}>
        <IconLink href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}>
          <FontAwesomeIcon icon={faTwitter} />
        </IconLink>
        <IconLink href={`https://github.com/${data.site.siteMetadata.social.github}`}>
          <FontAwesomeIcon icon={faGithub} />
        </IconLink>
        <IconLink href={`https://linkedin.com/in/${data.site.siteMetadata.social.linkedIn}`}>
          <FontAwesomeIcon icon={faLinkedin} />
        </IconLink>
      </div>
      <SiteHeader>
        <Content>
          <div>
            <HomeLink to="/">Home</HomeLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>
        </Content>
      </SiteHeader>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  social: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
  social: {},
}

export default Header

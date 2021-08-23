import React from "react"
import { useEffect } from "react"
import { graphql } from "gatsby"
import { Navbar } from "./navbar"
import highlightCode from './syntaxHighlight'


export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  useEffect(() => {
    highlightCode()
  });
  return (
    <main>
      <title>U Raval | {frontmatter.title}</title>
      <Navbar></Navbar>
      <div className="container my-5">
        <div className="row justify-content-center px-5">
          <h1 className="white fancy-font text-center">{frontmatter.title}</h1>
          <h2 className="white text-center">{frontmatter.date}</h2>
          <div
            className="white mt-5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </main>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
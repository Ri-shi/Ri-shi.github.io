import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const ProjectsPage = () => {
  return <div>Hello World in TSX</div>;
};

const cardStyle = {
  maxHeight: "25vh",
  overflowY: "scroll",
};

export const ProjectsPeak = () => {
  const data = useStaticQuery(graphql`
    query MyProjects {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              date
              slug
              title
              class
            }
          }
        }
      }
    }
  `);
  return (
    <div className="card text-white bg-dark w-100 rounded-3">
      <div className="card-header">
        <h4>Projects</h4>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {data.allMarkdownRemark.edges
            .filter((x) => {
              return x.node.frontmatter.class == "project";
            })
            .map((x) => {
              return (
                <li
                  className="list-group-item text-white bg-dark"
                  key={x.node.frontmatter.id}
                >
                  <Link to={x.node.frontmatter.slug}>
                    {x.node.frontmatter.title}
                  </Link>{" "}
                  ({x.node.frontmatter.date})
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ProjectsPage;

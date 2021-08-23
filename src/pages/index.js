import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BlogPeak } from "./blog";
import "./global.css";
import { Navbar } from "./navbar";
import { ProjectsPeak } from "./projects";

const propicStyles = {
  width: "300px",
  height: "auto",
  borderRadius: "100%",
};

// markup
const IndexPage = () => {
  return (
    <main>
      <title>U. Raval</title>
      <Navbar></Navbar>

      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <img
            style={propicStyles}
            src="/propic-filtered.png"
            alt="profile picture"
          />
        </div>
        <div className="row justify-content-center pt-5">
          <h1 className="white fancy-font text-center">Ushir (Rishi) Raval</h1>
        </div>
        <div className="row justify-content-center px-5">
          <p className="text-center medium-size-font white" style={{fontFamily: "Roboto Mono"}}>
              software developer;
          </p>
        </div>

        <div className="row my-5 mx-2">
          <div className="col-lg-12 col-md-12 col-sm-12 p-5">
            <div className="card text-white bg-dark w-100 rounded-3">
              <div className="card-header">
                <h4>About me</h4>
              </div>
              <div className="card-body">
                A proud South African working in the domain of Finance and an avid fan
                of SOLID code with interests in functional programming, human
                computer interaction and polyglot programming.
              </div>
            </div>
          </div>


          <div className="col-lg-6 col-md-12 col-sm-12 p-5">
            <ProjectsPeak></ProjectsPeak>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 p-5">
            <BlogPeak></BlogPeak>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

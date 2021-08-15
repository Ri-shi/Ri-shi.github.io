import * as React from "react"
import { Link } from "gatsby"
import { Navbar } from "./navbar"

const NotFoundPage = () => {
  return (
    <main>
      <title>U Raval | Not found</title>
      <Navbar></Navbar>
      <div className="container mt-5">
        <h1 className="white fancy-font">
          Sorry, this page does not exist at the moment.
        </h1>
        <Link to="/">Click here to go to the home page.</Link>.
      </div>
    </main>
  )
}

export default NotFoundPage

import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const Navbar = (props) => {
  const { auth, profile } = props
  const activeLinks = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  )
  return (
    <nav className="nav-wrapper grey darken">
      <div className="container">
        <Link to="/" className="navbar-logo">
          Firebase App
        </Link>
        {activeLinks}
      </div>
    </nav>
  )
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}
export default connect(mapStateToProps)(Navbar)

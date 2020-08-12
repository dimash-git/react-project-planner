import React from "react"
import useInput from "../../hooks/useInput"
import { connect } from "react-redux"
import { signIn } from "../../store/actions/authActions"
import { Redirect } from "react-router-dom"

const SignIn = (props) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("")
  const { signIn, authError, auth } = props
  const handleSubmit = (event) => {
    event.preventDefault()
    signIn({
      email,
      password,
    })
    resetEmail()
    resetPassword()
  }
  if (auth.uid) return <Redirect to="/" />

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email </label>
          <input type="email" id="email" {...bindEmail} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...bindPassword} />
        </div>

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
        </div>
        <div className="red-text center">
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => {
      dispatch(signIn(credentials))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

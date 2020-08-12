import React from "react"
import useInput from "../../hooks/useInput"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { signUp } from "../../store/actions/authActions"

const SignUp = (props) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("")
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("")
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput("")
  const handleSubmit = (event) => {
    event.preventDefault()
    signUp({
      email,
      password,
      firstName,
      lastName,
    })
  }
  const { auth, signUp, authError } = props
  if (auth.uid) return <Redirect to="/" />

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="firstName">First Name </label>
          <input type="text" id="firstName" {...bindFirstName} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" {...bindLastName} />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email </label>
          <input type="email" id="email" {...bindEmail} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...bindPassword} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Register</button>
        </div>
        <div className="red-text center">{authError ? authError : null}</div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

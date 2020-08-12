import React from "react"
import useInput from "../../hooks/useInput"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { createProject } from "../../store/actions/projectActions"

const CreateProject = (props) => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("")
  const { value: content, bind: bindContent, reset: resetContent } = useInput(
    ""
  )
  const { createProject, auth, history } = props
  const handleSubmit = (event) => {
    event.preventDefault()
    createProject({
      title,
      content,
    })
    resetTitle()
    resetContent()
    history.push("/")
  }
  if (!auth.uid) return <Redirect to="/signin" />
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Create Project</h5>
        <div className="input-field">
          <label htmlFor="title">Title </label>
          <input type="text" id="title" {...bindTitle} />
        </div>
        <div className="input-field">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            className="materialize-textarea"
            {...bindContent}
          ></textarea>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)

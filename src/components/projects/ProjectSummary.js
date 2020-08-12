import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const ProjectSummary = ({ project }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <Link to={`/project/${project.id}`}>
          <span className="card-title">{project.title}</span>
        </Link>
        <p>
          Posted by {project.authorFirstName} {project.authorLastName}
        </p>
        <p className="grey-text">
          {moment(project.timestamp.toDate().toString()).calendar()}
        </p>
      </div>
    </div>
  )
}
export default ProjectSummary

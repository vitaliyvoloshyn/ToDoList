import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, index }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <Link to={"/projects/" + project.id}> {project.name}</Link>
        </td>
        <td>{project.url}</td>
        <td>{project.user}</td>
      </tr>
    </tbody>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th scope="col">Название проекта</th>
          <th>URL</th>
          <th>Пользователи</th>
        </tr>
      </thead>
      {projects.map((project, index) => (
        <ProjectItem project={project} index={index} key={project.id} />
      ))}
    </table>
  );
};
export default ProjectList;

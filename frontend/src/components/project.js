import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project, index, deleteProject }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <Link to={"/projects/" + project.id}> {project.name}</Link>
        </td>
        <td>{project.url}</td>
        <td>{project.user}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteProject(project.id)}
          >
            Удалить
          </button>
        </td>
      </tr>
    </tbody>
  );
};

const ProjectList = ({ projects, deleteProject }) => {
  return (
    <div>
      <Link className="btn btn-outline-success" to="/projects/create">
        Добавить проект
      </Link>
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
          <ProjectItem
            project={project}
            index={index}
            key={project.id}
            deleteProject={deleteProject}
          />
        ))}
      </table>
    </div>
  );
};
export default ProjectList;

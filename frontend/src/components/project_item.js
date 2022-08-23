import React from "react";
import { useParams } from "react-router-dom";

const UserList = (user) => {
  return (
    <p className="card-text" style={{ marginBottom: 0 }}>
      {user.user}
    </p>
  );
};

const ProjectItem = (props) => {
  let params = useParams();

  let project_item = props.projects.filter((item) => item.id == params.id);

  let users = [];
  project_item[0].user.map(function (id) {
    props.users.map(function (item) {
      if (id == item.id) {
        users.push(item.username);
      }
    });
  });

  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      <div className="card-body">
        <h5 className="card-title">{project_item[0].name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Пользователи</h6>
        {users.map((item, index) => (
          <UserList user={item} key={index} />
        ))}
        <a href="#" className="card-link">
          {project_item[0].url}
        </a>
      </div>
    </div>
  );
};

export default ProjectItem;

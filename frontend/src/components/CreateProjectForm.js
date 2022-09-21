import React from "react";
import { useState } from "react";

const CreateProjectForm = ({ users = null, createProject }) => {
  let [state, setState] = useState({
    users: users,
    projectname: "",
    projecturl: "",
    projectuser: [],
  });

  function handleSubmit(event) {
    debugger;
    event.preventDefault();
    createProject(state.projectname, state.projecturl, state.projectuser);
  }

  const onChange = (event) => {
    console.log(event.target.id, event.target.value);
    console.log(event);
    setState((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const onUsersChange = (event) => {
    console.log(event.target.selectedOptions);
    if (!event.target.selectedOptions) {
      setState((prevState) => {
        return { ...prevState, users: [] };
      });
    }
    let usersOptions = [];
    for (let option of event.target.selectedOptions) {
      usersOptions.push(Number(option.value));
    }
    setState((prevState) => {
      return { ...prevState, projectuser: usersOptions };
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-3">
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Имя проекта"
            id="projectname"
            onChange={(event) => onChange(event)}
            value={state.projectname}
          ></textarea>
          <label>Имя проекта</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="URL проекта"
            id="projecturl"
            onChange={(event) => onChange(event)}
            value={state.projecturl}
          ></textarea>
          <label>URL проекта</label>
        </div>

        {/* <div className="form-floating">
          <select
            multiple
            className="form-select"
            id="projectuser"
            onChange={(event) => onUsersChange(event)}
            // value={state.projectuser}
          >
            {state.users.map((item) => (
              <option value={item.id}>{item.username}</option>
            ))}
          </select>
          <label htmlFor="projectuser">Пользователи</label>
        </div> */}

        <div>
          <select multiple onChange={(event) => onUsersChange(event)}>
            {state.users.map((item) => (
              <option value={item.id}>{item.username}</option>
            ))}
          </select>
        </div>
      </div>

      <input type="submit" className="btn btn-primary" value="Сохранить" />
    </form>
  );
};

export default CreateProjectForm;

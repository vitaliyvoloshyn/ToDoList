import React from "react";
import { useState } from "react";

const CreateTodoForm = ({ users = null, projects = null, createTodo }) => {
  console.log(users);
  let [state, setState] = useState({
    description: "",
    users: users,
    projects: projects,
    currentUser: "",
    currentProject: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    createTodo(state.currentProject, state.currentUser, state.description);
    event.preventDefault();
  }

  const onChange = (event) => {
    console.log(event.target.id, event.target.value);
    console.log(event);
    setState((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-3">
        <div className="form-floating">
          <select
            className="form-select"
            id="currentProject"
            aria-label="Floating label select example"
            onChange={(event) => onChange(event)}
            value={state.currentProject}
          >
            <option selected>Выбирете номер проекта</option>
            {state.projects.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
          <label htmlFor="currentProject">Проект</label>
        </div>

        <div className="form-floating">
          <select
            className="form-select"
            id="currentUser"
            aria-label="Floating label select example"
            onChange={(event) => onChange(event)}
            value={state.currentUser}
          >
            <option selected>Выбирете ответственного пользователя</option>
            {state.users.map((item) => (
              <option value={item.id}>{item.username}</option>
            ))}
          </select>
          <label htmlFor="currentUser">Пользователь</label>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Описание заметки"
            id="description"
            onChange={(event) => onChange(event)}
            value={state.description}
          ></textarea>
          <label>Описание заметки</label>
        </div>
      </div>

      <input type="submit" className="btn btn-primary" value="Сохранить" />
    </form>
  );
};

export default CreateTodoForm;

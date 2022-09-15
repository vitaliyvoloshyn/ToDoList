import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, index, deleteTodo }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{todo.project}</td>
        <td>{todo.description}</td>
        <td>{todo.createdAt}</td>
        <td>{todo.updatedAt}</td>
        <td>{todo.user}</td>
        <td>{todo.close}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteTodo(todo.id)}
          >
            Удалить
          </button>
        </td>
      </tr>
    </tbody>
  );
};

const TodoList = ({ todos, deleteTodo }) => {
  console.log(deleteTodo);
  return (
    <div>
      <Link className="btn btn-outline-success" to="/todos/create">
        Добавить заметку
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th scope="col">Проект</th>
            <th>Текст заметки</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th>Автор заметки</th>
            <th>Состояние заметки</th>
            <th>Удалить заметку</th>
          </tr>
        </thead>

        {todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            key={todo.id}
            deleteTodo={deleteTodo}
          />
        ))}
      </table>
    </div>
  );
};
export default TodoList;

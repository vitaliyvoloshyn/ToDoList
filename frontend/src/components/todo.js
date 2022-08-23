import React from "react";

const TodoItem = ({ todo, index }) => {
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
      </tr>
    </tbody>
  );
};

const TodoList = ({ todos }) => {
  return (
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
        </tr>
      </thead>

      {todos.map((todo, index) => (
        <TodoItem todo={todo} index={index} key={todo.id} />
      ))}
    </table>
  );
};
export default TodoList;

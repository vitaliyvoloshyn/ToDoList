import React from "react";
const UserItem = ({ user, index }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    </tbody>
  );
};

const UserList = function ({ users }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th scope="col">Username</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </thead>

      {users.map((user, index) => (
        <UserItem user={user} index={index} key={user.id} />
      ))}
    </table>
  );
};
export default UserList;

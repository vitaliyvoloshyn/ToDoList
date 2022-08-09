import React from "react";
const UserItem = ({ user, index }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.username}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    </tbody>
  );
};

const UserList = ({ users }) => {
  return (
    <table class="table table-striped">
      <thead>
        <th>#</th>
        <th scope="col">Username</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Email</th>
      </thead>
      
        {users.map((user, index) => (
          <UserItem user={user} index={index}/>
        ))}
      
    </table>
  );
};
export default UserList;

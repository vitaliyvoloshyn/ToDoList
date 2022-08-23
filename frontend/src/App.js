import React from "react";
import "./App.css";
import UserList from "./components/User.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer";
import ProjectList from "./components/project";
import axios from "axios";
import TodoList from "./components/todo";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProjectItem from "./components/project_item";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todos: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        const users = response.data;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/projects")
      .then((response) => {
        const projects = response.data;
        this.setState({
          projects: projects,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/todo")
      .then((response) => {
        const todos = response.data;
        this.setState({
          todos: todos,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="table table-striped">
            <Routes>
              <Route path="/" element={<UserList users={this.state.users} />} />
              <Route
                path="/projects"
                element={<ProjectList projects={this.state.projects} />}
              />

              <Route
                exact
                path="/projects/:id"
                element={
                  <ProjectItem
                    projects={this.state.projects}
                    users={this.state.users}
                  />
                }
              />

              <Route
                exact
                path="/todos"
                element={<TodoList todos={this.state.todos} />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;

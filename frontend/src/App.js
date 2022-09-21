import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/User.js";
import Navbar from "./components/Navbar/navbar.js";
import Footer from "./components/Footer/footer";
import ProjectList from "./components/project";
import axios from "axios";
import TodoList from "./components/todo";
import ProjectItem from "./components/project_item";
import AuthForm from "./components/AuthForm";
import CreateTodoForm from "./components/CreateTodoForm";
import CreateProjectForm from "./components/CreateProjectForm";
import { Navigate } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todos: [],
      token: "",
      user: "",
      redirect: false,
    };
  }

  obtainAuthToken(login, password) {
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", {
        username: login,
        password: password,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        this.setState(
          {
            user: user,
            token: token,
          },
          this.get_data
        );
      })
      .catch((error) => console.log(error));
  }

  isAuth() {
    return this.state.token ? true : false;
  }

  get_headers() {
    if (this.isAuth()) {
      return {
        Authorization: "Token " + this.state.token,

        // "Cache-Control": "no-store",
      };
    }
    return {};
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    this.setState(
      {
        user: user,
        token: token,
      },
      this.get_data
    );
  }

  logOut() {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    this.setState(
      {
        users: [],
        projects: [],
        todos: [],
        token: "",
        user: "",
      },

      this.get_data
    );
  }

  deleteTodo(id) {
    console.log("delete:", id);
    const headers = this.get_headers();
    fetch(`http://127.0.0.1:8000/api/todo/${id}`, {
      method: "DELETE",
      headers: headers,
      cache: "reload",
    }).then((response) => {
      this.get_data();
    });

    // .delete(`http://127.0.0.1:8000/api/todo/${id}`, { headers, headers })
    // .then((response) => {
    //   console.log(response);
    //   this.get_data();
    // })
    // .catch((error) => console.log(error));
  }

  deleteProject(id) {
    const headers = this.get_headers();
    fetch(`http://127.0.0.1:8000/api/projects/${id}/`, {
      method: "DELETE",
      headers: headers,
      cache: "reload",
    }).then((response) => {
      this.setState({
        projects: this.state.projects.filter((item) => item.id !== id),
      });
    });
  }

  createTodo(project, user, description) {
    const headers = this.get_headers();
    let data = { project: project, user: user, description: description };
    axios
      .post("http://127.0.0.1:8000/api/todo/", data, { headers: headers })
      .then(() => {
        this.get_data();
        this.setState({ redirect: "/todos" });
      })
      .catch((error) => console.log(error));
  }

  createProject(project, url, user) {
    const headers = this.get_headers();
    let data = { name: project, url: url, user: user };
    axios
      .post("http://127.0.0.1:8000/api/projects/", data, { headers: headers })
      .then(() => {
        this.get_data();
        this.setState({ redirect: "/projects" });
      })
      .catch((error) => console.log(error));
  }

  get_data() {
    // сбрасываем значение редиректа в стэйте
    this.setState({ redirect: false });

    console.log("redirect get_data", this.state.redirect);
    console.log("get_data");
    let headers = this.get_headers();

    axios
      .get("http://127.0.0.1:8000/api/users/?version=1.2", {
        headers: headers,
      })
      .then((response) => {
        const users = response.data;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.log(error));

    axios
      .get("http://127.0.0.1:8000/api/projects", { headers: headers })
      .then((response) => {
        const projects = response.data;
        this.setState({
          projects: projects,
          redirect: false,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/todo", { headers: headers })
      .then((response) => {
        const todos = response.data;
        this.setState({
          todos: todos,
        });
      })
      .catch((error) => console.log(error));
    console.log(this.state.todos);
  }

  render() {
    console.log("redirect", this.state.redirect);
    return (
      <BrowserRouter>
        <div>
          {this.state.redirect ? (
            <Navigate to={this.state.redirect} />
          ) : (
            <div />
          )}
          <Navbar
            isAuth={this.isAuth.bind(this)}
            logOut={this.logOut.bind(this)}
            user={this.state.user}
          />
          <div className="table table-striped">
            <Routes>
              <Route path="/" element={<UserList users={this.state.users} />} />
              <Route
                path="/projects"
                element={
                  <ProjectList
                    projects={this.state.projects}
                    deleteProject={(id) => this.deleteProject(id)}
                  />
                }
              />

              <Route
                exact
                path="/projects/create"
                element={
                  <CreateProjectForm
                    users={this.state.users}
                    createProject={(name, url, users) => {
                      this.createProject(name, url, users);
                    }}
                  />
                }
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
                path="/login"
                element={
                  <AuthForm
                    obtainAuthToken={(login, password) =>
                      this.obtainAuthToken(login, password)
                    }
                    isAuth={this.isAuth.bind(this)}
                    state={this.state}
                  />
                }
              />

              <Route
                exact
                path="/todos"
                element={
                  <TodoList
                    todos={this.state.todos}
                    deleteTodo={(id) => this.deleteTodo(id).bind(this)}
                  />
                }
              />

              <Route
                exact
                path="/todos/create"
                element={
                  <CreateTodoForm
                    users={this.state.users}
                    projects={this.state.projects}
                    createTodo={(project, user, description) => {
                      this.createTodo(project, user, description);
                    }}
                  />
                }
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

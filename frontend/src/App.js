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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todos: [],
      token: "",
      user: "",
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
      return { Authorization: "Token " + this.state.token };
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

  get_data() {
    let headers = this.get_headers();
    axios
      .get("http://127.0.0.1:8000/api/users", { headers: headers })
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
  }

  render() {
    return (
      <BrowserRouter>
        <div>
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

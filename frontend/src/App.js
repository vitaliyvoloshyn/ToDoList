import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/User.js";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer"
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      navbar: [],
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
  }

  render() {
    return ( 
      <div>
        <Navbar/>
        <div class="table table-striped">
          <UserList users={this.state.users} />
        </div>
        <Footer/>
      </div>
    );
  }
}
export default App;

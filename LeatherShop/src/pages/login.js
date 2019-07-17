import React, { Component } from "react";
import  {withFirebase} from "../components/Firebase";

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      console.log(value);
      console.log(name);
      this.setState({
        [name]: value
      }
      );
    }

    loginClick(event) {
      event.preventDefault();
      this.props.firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {})
        .catch(error => {
          console.log(error);
        });
    }

  //   signup(e) {
  //     e.preventDefault();
  //     this.props.firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //       .then(u => {})
  //       .then(u => {
  //         console.log(u);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  render() {
    return (
      <div className="app-content">
        <div className="container">
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                value={this.state.email} 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password} 
              />
            </div>
            <button type="submit" onClick={this.loginClick} className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const Login = withFirebase(LoginBase);
export default Login;

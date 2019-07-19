import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    console.log(name);
    this.setState({
      [name]: value
    });
  };

  loginClick = event => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  };

  signupClick = event => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className=" container-login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn float-left login_btn "
                    onClick={this.loginClick}
                    value="Log In"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn float-right signup_btn "
                    onClick={this.signupClick}
                    value="Sign Up"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = withFirebase(LoginBase);
export default Login;

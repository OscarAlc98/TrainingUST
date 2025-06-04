import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", accessToken: "", id: "", email: "", roles: [] },
    };
  }

  componentDidMount() {
    const stored = AuthService.getCurrentUser();
    if (!stored) {
      this.setState({ redirect: "/home" });
      return;
    }
    // stored = { accessToken, user: { id, username, email, roles } }
    const { accessToken, user } = stored;
    // Aplanamos user y agregamos accessToken
    this.setState({
      currentUser: {
        username: user.username,
        accessToken: accessToken,
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
      userReady: true,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady ? (
          <div className="card col-md-12">
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

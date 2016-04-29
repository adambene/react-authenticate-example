import React from 'react';

export default class Login extends React.Component {
  static username = 'joe';
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      error: false,
    };
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleLogin(event) {
    event.preventDefault();

    this.setState({
      isAuthenticated: this.state.username === Login.username,
      error: this.state.username !== Login.username,
    });

    this.props.store.setState({
      isAuthenticated: this.state.username === Login.username
    });
  }
  render() {
    return (
      <form className="form-inline">
        <div className="alert alert-info">Valid username: {Login.username}</div>
        <p>Login</p>
        {this.state.error && <div className="alert alert-danger">Wrong username!</div>}
        <input
          type="text"
          className="form-control"
          placeholder="username"
          onChange={(event) => this.handleUsernameChange(event)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(event) => this.handleLogin(event)}
        >Login</button>
      </form>
    );
  }
}

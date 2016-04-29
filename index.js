import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import { ProvideAuthenticationComponent, authenticate, authenticateWith } from 'react-authenticate';

//console.log(require('react-authenticate/decorator/authenticate'));

class Store {
  constructor(state) {
    this.state = state;
    this.subscribers = [];
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
  setState(state) {
    this.state = Object.assign(this.state, state);
    this.subscribers.map(subscriber => subscriber());
  }
  getState() {
    return this.state;
  }
}

var store = new Store({
  isAuthenticated: false,
  users: [
    { id: 1, name: 'Joe' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carl' },
  ]
});

@authenticate
class UserList extends React.Component {
  render() {
    return (
      <div>
        <h3>List of Users</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) =>
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function render() {
  ReactDOM.render(
    <div>
      <h1>react-authenticate example</h1>
      <p>This is an example of a component protected by authentication using the <strong>react-authenticate</strong> decorator.</p>
      <ProvideAuthenticationComponent
        component={Login}
        isAuthenticated={() => store.getState().isAuthenticated}
      >
        <UserList store={store} users={store.getState().users}/>
      </ProvideAuthenticationComponent>
    </div>,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();

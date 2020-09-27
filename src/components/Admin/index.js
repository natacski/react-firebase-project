import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { ListGroup } from 'react-bootstrap';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h2>Admin</h2>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ListGroup style={{ padding: 50 }}>
    {users.map((user) => (
      <ListGroup.Item>
        key={user.uid}{' '}
        <span style={{ paddingLeft: 20 }}>
          <strong>ID:</strong> {user.uid}
        </span>
        <span style={{ paddingLeft: 20 }}>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span style={{ paddingLeft: 20 }}>
          <strong>Username:</strong> {user.username}
        </span>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default withFirebase(AdminPage);

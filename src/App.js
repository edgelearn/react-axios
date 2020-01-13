import React from 'react';
import axios from 'axios';

const host_url = 'https://jsonplaceholder.typicode.com';

export default class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {users: []};
  }

  componentDidMount() {
    axios.get(host_url + '/users/')
      .then(response => {
        const users = response.data;  // data is a list of users the server sent us
        this.setState({ users });
      })
      .catch(response => {
        this.setState({ users: null });
      })
  }

  render() {
    if (!this.state.users){
      return <p style={{backgroundColor: 'red'}}>something went terribly wrong!</p>
    }

    return (
      <ul>
        { this.state.users.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    )
  }
}
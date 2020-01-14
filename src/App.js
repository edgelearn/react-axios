import React from 'react';
import axios from 'axios';


// this is a third party service we have no control over
const host_url = 'https://jsonplaceholder.typicode.com';


export default class UserList extends React.Component {
  constructor(props){
    super(props);
    this.state = {posts: [], myPost: ""};
  }

  componentDidMount() {
    axios.get(host_url + '/posts/')
      .then(response => {
        const posts = response.data;  // data is a list of users the server sent us
        this.setState({ posts });
      })
      .catch(response => {
        this.setState({ posts: null });
      })
  }

  submitPost =  e => {  // e is the event
    e.preventDefault();  // stop whatever was about to happen with this submit

    const payload = {post: this.state.myPost}
    axios.post(host_url + '/posts/', payload)
      .then(response => {
        console.log(response.data)
        alert("server received post: " + response.data.post);
      })
  }

  handleChange = e => {
    this.setState({myPost: e.target.value})  // assign the value of the field to the state
  }

  render() {
    if (!this.state.posts){
      return <p style={{backgroundColor: 'red'}}>something went terribly wrong!</p>
    }

    return (
      <div>
      <form onSubmit={this.submitPost}>
        <label>
              My post:
              <input type="text" name="content" onChange={this.handleChange} />
            </label>
            <button type="submit">Add</button>
      </form>

      <ul>
        { this.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
      </div>
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

//Basic URL: practiceapi.devmountain.com/api 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  // componentDidMount() {
  //   axios.get('https://practiceapi.devmountain.com/api/posts')
  //     .then(res => {
  //       this.setState({posts: res.data})
  //       console.log(res.data)
  //     })
  //     .catch(err => console.log(err))
  // }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({ posts: results.data }, console.log(results));
    });
  }

  // updatePost(id,text) {
  // axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text} )
  //   .then(res => {
  //     this.setState({posts : res.data})
  //   })
  // }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, {text})
      .then( results => {
      this.setState({ posts: results.data });
    });
  }
  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
     .then(results => this.setState({posts : results.data}))
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {/* {
            posts.map( post => (
              <Post key={ post.id } 
              date = {post.date}
              text = {post.text}/>
            ))
          } */}
          {
          posts.map( post => (
            <Post id={ post.id }
            text={ post.text}
            date={ post.date }
            updatePostFn = {this.updatePost} 
            deletePostFn = {this.deletePost}/>
          ))
}

        </section>
      </div>
    );
  }
}

export default App;

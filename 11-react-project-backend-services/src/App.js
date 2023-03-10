import React, { Component } from "react";
import http from "./services/http-services";
import config from "./config.json";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await http.get(config.url);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.url, obj);
    console.log(post);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(`${config.url}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${config.url}/${post.id}`);
      // throw new Error("");
    } catch (ex) {
      console.log("Handle delete");
      if (ex.response && ex.response.status === 404) {
        toast.error("This post has already been deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container mt-3">
          <button className="btn btn-primary" onClick={this.handleAdd}>
            Add
          </button>
          <table className="table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Update</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr key={post.id}>
                  <td key={post.id}>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

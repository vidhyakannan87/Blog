import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { deletePost } from "../actions";
import { Link } from "react-router-dom";

class ShowPost extends Component {
  componentDidMount() {
    //Given by react router to access id from the URL with params holding values of all values.
    //The below statetment is to look for param with name id in the URl and assign it to a variable id.
    const { id } = this.props.match.params;

    this.props.fetchPost(id);
  }
  onDelete()
  {
       const { id } = this.props.match.params;
       this.props.deletePost(id ,() =>{
         this.props.history.push('/');
       });
  }
  render() {
    const { post } = this.props;

    if( !post)
    {
      return <div> Loading... </div>
    }
    return (
      <div>
       <Link to= "/"> Back To Index </Link>
       <button className = "btn btn-danger pull-xs-right" onClick={this.onDelete.bind(this)}>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchPost,deletePost }
)(ShowPost);

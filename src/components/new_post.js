import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class NewPost extends Component {
  renderComponent(field) {
    //=> ES6 way of getting touch and error from meta of field;refer below method for complete syntax
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label} :</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  renderContent(field) {
    const className = `form-group ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;
    return (
      <div className={className}>
        <label>{field.label} :</label>
        <textarea
          rows="10"
          cols="50"
          className="form-control"
          type="text"
          size="100"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPost(values,()=>{
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="Title" component={this.renderComponent} />
        <Field
          name="categories"
          label="Category"
          component={this.renderComponent}
        />
        <Field name="content" label="Content" component={this.renderContent} />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a Title";
  }
  if (!values.categories) {
    errors.categories = "Enter a valid Category";
  }
  if (!values.content) {
    errors.content = "Enter some Post Content";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "PostNewForm"
})(connect(null, { createPost } )(NewPost));

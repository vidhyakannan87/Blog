import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import ReduxPromise from 'redux-promise';
import reducers from "./reducers";

import PostIndex from "./components/posts_index";
import NewPost from  "./components/new_post";
import ShowPost from "./components/show_post";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/*<App />*/}
    <BrowserRouter>
      <div>
      <Switch>
        <Route path="/posts/new" component={NewPost} />
        <Route path="/posts/:id" component={ShowPost} />
        <Route path="/" component={PostIndex} />
      </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);

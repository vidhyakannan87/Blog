import _ from "lodash";
import { FETCH_POSTS,FETCH_POST,DELETE_POST } from "../actions";


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
    //Take all the existing posts and add the current fetched post at the end with key as id and value as actual post
    //ES6 syntax
      return {...state, [action.payload.data.id]: action.payload.data };

    /*ES5 way
      const post = action.payload.data;
      const newState ={... state}; =>take all the existing posts
      newState[post.id] = post;//Add a new item with key as post id to object newState and value is actual post itself
      return newState;
    */

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");

    case DELETE_POST:
    //Removes the deleted Post from local memory as well in order to be consistent with the remote
    //This will happen automatically when index page is called but just to be consistent and show valid data in
    //case of slow internet this helps
       return _.omit(state,action.payload);
    default:
      return state;
  }
}

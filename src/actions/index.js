import axios from "axios";
export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";
const ROOT_URI = "http://reduxblog.herokuapp.com/api/posts";
const API_KEY = "VBLOG1012";
export function fetchPosts() {
  const request = axios.get(`${ROOT_URI}?key=${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(post,callback)
{
   const request = axios.post(`${ROOT_URI}?key=${API_KEY}`,post)
   .then(()=> callback());
   return {
     type: CREATE_POST,
     payload: request
   };

}

export function fetchPost(id)
{
  const request = axios.get(`${ROOT_URI}/${id}?key=${API_KEY}`);
  return {
    type: FETCH_POST,
    payload: request
  };

}

export function deletePost(id,callback)
{
   const request= axios.delete(`${ROOT_URI}/${id}?key=${API_KEY}`).
   then(() => callback());
   return{
      type: DELETE_POST,
      payload:id
   }
}

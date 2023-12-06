import express from 'express';
const post  = express.Router();
import { getPosts, uploadPost, deletePost, reportPost, updatePostStatus, getPostsReported } from '../controller/posts.controller.js';

post.get('/', getPosts);
post.get('/getPostsReported', getPostsReported)
post.post('/', uploadPost);
post.delete('/:id(\\d+)', deletePost);
post.put('/reportPost/:id(\\d+)', reportPost);
post.put('/updatePostStatus/:id(\\d+)', updatePostStatus)


export default post;
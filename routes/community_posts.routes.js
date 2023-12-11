import express from 'express';
const posts_communidad  = express.Router();
import { addCommunityPost } from '../controller/community_posts.controller.js'

posts_communidad.post('/', addCommunityPost);

export default posts_communidad; 
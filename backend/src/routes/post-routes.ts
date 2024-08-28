import { Router } from 'express'

import postServices from '../services/post-services'
import { PostDto } from '../dtos/post-dto'

const router = Router()

router.post('/posts', async (request, response) => {
  const post = await postServices.addPost({
    content: request.body.content,
    owner: request.body.owner,
  } );

  const postDto: PostDto  = {
    id: post.id,
    content: request.body.content,
    owner: request.body.owner,
  } 

  response.status(201).json(postDto);
})


export default router
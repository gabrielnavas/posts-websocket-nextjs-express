import { PostDto } from "../dtos/post-dto"

import WebSocket from 'ws';

import postController from '../controllers/post-controller'
import { MessageWS } from "./config";
import postServices from "../services/post-services";

type PostAction = {
  action: string
  data: PostDto
}

const filterAction = async (otherClients: WebSocket[], postAction: PostAction) => {
  switch (postAction.action) {
    case 'ADD_POST':
      const post = await postController.addPost(postAction.data)
      const postDto = {
        id: post.id,
        content: post.content,
        owner: post.owner,
      } as PostDto

      for(let client of otherClients) {
        const data: MessageWS = {
          action: 'ADD_POST',
          data: postDto 
        }
        client.send(JSON.stringify(data));
      }
    default:
      return 'contact the admin';
  }
}

const sendPostsAfterOpenConnection = async (ws: WebSocket) => {
  const posts =  await postServices.findPosts();
  const postDtos = posts.map(post => ({
    content: post.content,
    owner: post.owner,
    id: post.id
  }) as PostDto);
  const postReversed = postDtos.reverse()
  const data = {
    action: "FIND_POSTS", 
    data: postReversed, 
  }
  ws.send(JSON.stringify(data))
}


export default { filterAction, sendPostsAfterOpenConnection }
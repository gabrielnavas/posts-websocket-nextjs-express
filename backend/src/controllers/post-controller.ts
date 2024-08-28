import { PostDto } from "../dtos/post-dto";

import postServices from '../services/post-services'

const addPost = async (dto: PostDto): Promise<PostDto> => {
  const postDto: PostDto = {
    content: dto.content,
    owner: dto.owner,
  }
  const post = await postServices.addPost(postDto);
  return {
    content: post.content,
    owner: post.owner,
    id: post.id,
  }
}

export default { addPost }
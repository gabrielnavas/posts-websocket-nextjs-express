import crypto from "crypto"
import { PostDto } from "../dtos/post-dto"
import Post from "../models/Post"

const posts: Post[] = [
  new Post(
    '170bd07f-d4a5-441f-bdd8-acfe3da713df',
    '1337',
    'Agora vai!',
  )
]

const addPost = async (dto: PostDto): Promise<Post> => {
  const post = new Post(
    crypto.randomUUID().toString(),
    dto.owner,
    dto.content
  )
  posts.push(post);
  return post;
}

const findPosts = async (page: number = 0, size: number = 10, search: string = '') => {
  const returnPosts = []
  const realPage = page === 0 ? 0 : page - 1
  const init = realPage * size;
  for (let i = init * page; i < posts.length && i < size; i++) {
    const post = (posts[i]);
    returnPosts.push(post);
    // const searchMatch = post.owner.includes(search) || post.content.includes(search);
    // if (searchMatch) {
    //   returnPosts.push(post);
    // }
  }
  return returnPosts;
}

const findPostById = async (postId: string): Promise<Post> => {
  const post = posts.find(post => post.id === postId);
  if (post === undefined) {
    throw new Error('post not found');
  }
  return post;
}

export default { addPost, findPosts, findPostById }
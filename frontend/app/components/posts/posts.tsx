import styles from './posts.module.css'

import PostComponent, { Post } from "../post/post"

type Props = {
  posts: Post[]
}

export default function PostsComponent(props: Props) {
  return (
    <ul className={styles.container}>
      {props.posts.map((post, index) => (
        <PostComponent key={index} post={post} />
      ))}
    </ul>
  )
}
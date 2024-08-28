import styles from './post.module.css'

export type Post = {
  id: string
  content: string
  owner: string
}

type Props = {
  post: Post
}

export default function PostComponent(props: Props) {
  return (
    <li className={styles.container}>
      <div className={styles.owner}>@{props.post.owner}</div>
      <div className={styles.content}>{props.post.content}</div>
    </li>
  )
}
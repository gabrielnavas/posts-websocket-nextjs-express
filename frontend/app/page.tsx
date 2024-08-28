'use client'

import { useEffect, useState } from "react"
import Posts from "./components/posts/posts"
import AddPostForm from "./components/add-post-form/add-post-form"

type Post = {
  id: string
  owner: string
  content: string
}

type MessageWS = {
  action: string
  data: any
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  const [socket,setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001')

    setSocket(socket)

    socket.onopen = (event) => {
      console.log(event)
    }
    socket.onmessage = (event) => {
      const data: MessageWS = JSON.parse(event.data)

      switch(data.action) {
        case 'FIND_POSTS': {
          const lastPosts: Post[] = data.data
          setPosts(rest => [...lastPosts, ...rest]);
          break;
        }

        case 'ADD_POST': {
          const newPost: Post = data.data
          setPosts(rest => [newPost, ...rest]);
          break;
        }
      }

    }
    socket.onclose = e => {
      console.log(e)
    }
    return () => socket.close()
  }, [])

  return (
    <div>
      {
        socket && (
          <AddPostForm client={socket} />
        )
      }
      <Posts posts={posts} />
    </div>
  )
}

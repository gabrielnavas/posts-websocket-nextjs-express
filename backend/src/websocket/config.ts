import {WebSocket} from 'ws'
import postWebsocket from "./post-websocket";

const clients: Set<WebSocket> = new Set([]);

export type MessageWS = {
  action: string
  data: any
}

export const connectionWs  = async (ws: WebSocket) => {
  console.log('New client connected');

  clients.add(ws);
  await postWebsocket.sendPostsAfterOpenConnection(ws);

  ws.on('message', async (data: string) => {
    const message: MessageWS = JSON.parse(data);
    switch (message.action) {
      case 'POST':  
        await postWebsocket.filterAction([...clients], message.data)
        break
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
}

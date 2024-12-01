import { chat } from './types/chat';
import React, { useEffect, useRef, useState } from 'react'

import './App.css'
import { Message } from './components/Message';

function App() {
  const [chats, setChat] = useState<chat[]>([]);
  const inputRef = React.useRef < HTMLInputElement > (null);
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = (event) => {
      // @ts-ignore
      socketRef.current.send(JSON.stringify({
        "type": "join",
        "payload": {
            "roomId": "Red"
        }
      }))
    }
    
    ws.onmessage = (event) => {
      setChat(oldVal => [...oldVal, { isOther: true, message: event.data }]);
    };
    
    socketRef.current = ws;

    return () => {
      ws.close();
    }
  }, []);


  return (
    <div className='h-full w-[50vw] m-auto bg-slate-600'>
      <div className='h-[10vh] text-3xl content-center font-bold shadow-md text-center text-slate-100'>
        Chat Application
      </div>
      <div className='h-[80vh] bg-slate-400'>
        { chats.map(t => <Message isOther={t.isOther} message={t.message} />) }
      </div>
      <div className='h-[10vh] flex'>
        <input ref={inputRef} type='text' className='h-full m-auto w-[40vw] p-3 border-none' />
        <button className='font-bold border-slate-500 w-[10vw] bg-green-400' onClick={() => {
          socketRef.current?.send(JSON.stringify({
            "type": "message",
            "payload": {
                "message": inputRef.current?.value ?? ""
            }
          }));
          setChat(oldVal => [...oldVal, { isOther: false, message: inputRef.current?.value ?? "" }]);
        }}>Send</button>
      </div>
    </div>
  )
}

export default App
 
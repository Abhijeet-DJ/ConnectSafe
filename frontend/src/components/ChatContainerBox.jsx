import React, { useEffect , useRef  } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from '../components/MessageInput.jsx'
import ChatHeader from './ChatHeader.jsx';
import MessageSkeleton from '../components/skeletons/MessageSkeleton.jsx'
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/utils.js';

function ChatContainerBox() {
  const { messages , getMessages , isMessagesLoading , selectedUser , listenToMesages , notListenToMessages } = useChatStore();
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  console.log("selectedUser :",selectedUser ,"\n","messages sender Id  :",messages.senderId , "\n messages :",messages,"\n Auth user id :",authUser._id);
  

  useEffect(() => {
    getMessages(selectedUser._id)

    listenToMesages()

    return () => notListenToMessages();
  },[selectedUser._id , getMessages , listenToMesages , notListenToMessages])

   useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  if(isMessagesLoading) return ( 
    <div className='flex flex-1 flex-col overflow-auto ' >

      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />

    </div>
   )
  
  //  console.log("check to see sender Id matches curr user Id" ,messages[messages.length - 1].senderId === authUser._id  , "Ids are :" ,messages[messages.length - 1].senderId,authUser._id ," and last message is :",messages[messages.length - 1] );

  return (
    <div className='flex-1 flex flex-col overflow-hidden h-[600px] ' >

      <ChatHeader />

      <div className='flex-1 overflow-y-scroll p-4 space-y-4 h-full ' >
        { messages.map((m) => (
          <div
          key={m._id}
          className={`chat ${ m.senderId === authUser._id ? "chat-end" : "chat-start" } `}
          ref={messageEndRef}
          >
            <div className='chat-image avatar' >
              <div className='size-10 rounded-full border ' >
                <img 
                src={ m.senderId === authUser._id ? authUser.profileImg || "/hacker.png" : selectedUser.profileImg || "/hacker.png" } 
                alt="Profile picture" 
                />
              </div>
            </div>
            <div className='chat-header mb-1 ' >
              <time className='text-xs opacity-50 ml-1 ' >
                { formatMessageTime(m.createdAt) }
              </time>
            </div>
            <div className='chat-bubble flex flex-1 flex-col justify-around ' >
              { m.image && (
                <img 
                src={m.image} 
                alt="Attachment" 
                className='sm:max-w-[200px] rounded-md mb-2 '
                />
              ) }
              { m.text && <p>{m.text}</p> }
            </div>
          </div>
        )) }
      </  div>

      <MessageInput />

    </div>
  )
}

export default ChatContainerBox

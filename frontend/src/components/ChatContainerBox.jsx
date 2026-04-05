import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from '../components/MessageInput.jsx'
import ChatHeader from './ChatHeader.jsx';
import MessageSkeleton from '../components/skeletons/MessageSkeleton.jsx'
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/utils.js';

function ChatContainerBox() {
  const { messages, getMessages, isMessagesLoading, selectedUser, listenToMesages, notListenToMessages } = useChatStore();
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)

    listenToMesages()

    return () => notListenToMessages();
  }, [selectedUser._id, getMessages, listenToMesages, notListenToMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  if (isMessagesLoading) return (
    <div className='flex flex-1 flex-col overflow-auto ' >

      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />

    </div>
  )

  //  console.log("check to see sender Id matches curr user Id" ,messages[messages.length - 1].senderId === authUser.id  , "Ids are :" ,messages[messages.length - 1].senderId,authUser.id ," and last message is :",messages[messages.length - 1] );

  // console.log(messages[messages.length - 1].senderId === authUser.id);


  return (
    <div className='flex-1 flex flex-col overflow-hidden h-[600px]'>
      <ChatHeader />

      <div className='flex-1 overflow-y-scroll p-4 space-y-4 h-full'>
        {messages.map((m, i) => {
          // Strict string comparison to avoid ObjectId mismatches
          const isMyMessage = String(m.senderId) === String(authUser?.id);

          return (
            <div
              key={m._id ?? i}
              className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
            // DO NOT put ref={messageEndRef} here
            >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={isMyMessage ? (authUser.profileImg || "/hacker.png") : (selectedUser.profileImg || "/hacker.png")}
                    alt="Profile"
                  />
                </div>
              </div>

              <div className='chat-bubble flex flex-col'>
                {m.image && (
                  <img src={m.image} alt="Attachment" className='max-w-[200px] rounded-md mb-2' />
                )}
                {/* If it shows "No Content", then the key 'text' is missing in your state array */}
                {m.text ? <p>{m.text}</p> : <p className="text-error">No Content</p>}
              </div>

              <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formatMessageTime(m.createdAt)}
              </div>
            </div>
          );
        })}

        {/* PLACE THE REF HERE - AT THE VERY END OF THE LIST */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainerBox

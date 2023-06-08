'use client'
import useConversation from '#/hooks/useConversation'
import { pusherClient } from '#/libs/pusher'
import { FullMessage } from '#/types'
import axios from 'axios'
import React from 'react'
import find from 'lodash/find'
import MessageBox from './MessageBox'

interface Props {
  initialMessages: FullMessage[]
}

const Body: React.FC<Props> = ({ initialMessages }) => {
  const [messages, setMessages] = React.useState(initialMessages)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  React.useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  React.useEffect(() => {
    pusherClient.subscribe(conversationId)

    const mesHandler = (message: FullMessage) => {
      console.log('here');
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages((cur) => {
        if (find(cur, { id: message.id })) {
          return cur
        }

        return [...cur, message]
      })

      bottomRef.current?.scrollIntoView()
    }

    const mesHandlerUpdate = (newMessage: FullMessage) => {
      setMessages((cur) => cur.map((curMes) => {
        if(curMes.id === newMessage.id) {
          return newMessage
        }

        return curMes
      }))
    }

    pusherClient.bind('messages:new', mesHandler)
    pusherClient.bind('messages:update', mesHandlerUpdate)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', mesHandler)
      pusherClient.unbind('messages:update', mesHandlerUpdate)
    }
    // axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => {
        return (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />

        )
      })}
      <div ref={bottomRef} className='p-24' />
    </div>
  )
}

export default Body
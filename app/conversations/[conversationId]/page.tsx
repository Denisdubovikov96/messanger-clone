import getConversationById from '#/actions/getConversationById'
import getMessages from '#/actions/getMessages'
import Body from '#/components/core/Conversations/Body'
import Form from '#/components/core/Conversations/Form'
import Header from '#/components/core/Conversations/Header'
import EmptyState from '#/components/core/EmptyState'
import React from 'react'

interface Props {
    conversationId: string
}

const ConversationId = async ({ params }: { params: Props }) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className='lg:pl-80 h-full'>
                <div className='h-full flex flex-col'>
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <Header conversation={conversation}/>
                <Body initialMessages={messages}/>
                <Form/>
            </div>
        </div>
    )
}

export default ConversationId
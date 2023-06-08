'use client'

import React from 'react'
import useConversation from '#/hooks/useConversation'
import { FullConversation } from '#/types'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '#/libs/pusher'
import find from 'lodash/find'

interface ConversationListProps {
    initialItems: FullConversation[]
    users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const session = useSession()
    const [items, setItems] = React.useState(initialItems)
    const [isModalOpen, setIsOpen] = React.useState(false)
    const router = useRouter()

    const { conversationId, isOpen } = useConversation()

    const pusherKey = React.useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    React.useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const handlerNew = (conversation: FullConversation) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current
                }

                return [...current, conversation]
            })
        }

        const handlerUpdate = (conversation: FullConversation) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }
                return currentConversation
            }))
        }

        const handlerRemove = (conversation: FullConversation) => {
            setItems((current) => current.filter((currentConversation) => currentConversation.id !== conversation.id))

            if(conversation.id === conversationId) {
                router.push('/conversations')
            }
        }
        pusherClient.bind('conversation:new', handlerNew)
        pusherClient.bind('conversation:update', handlerUpdate)
        pusherClient.bind('conversation:remove', handlerRemove)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', handlerNew)
            pusherClient.unbind('conversation:update', handlerUpdate)
            pusherClient.unbind('conversation:remove', handlerRemove)
        }
    }, [pusherKey,conversationId,router])


    return (
        <>
            <GroupChatModal
                isOpen={isModalOpen}
                onClose={() => setIsOpen(false)}
                users={users}
            />
            <aside
                className={classNames('fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200', isOpen ? "hidden" : "block w-full left-0")}
            >
                <div className='px-5'>
                    <div className='flex justify-between mb-4 pt-4'>
                        <div className='text-2xl font-bold text-neutral-800'>
                            Messages
                        </div>
                        <div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
                            <MdOutlineGroupAdd size={20} onClick={() => setIsOpen(true)} />
                        </div>
                    </div>

                    {items.map((conversation) => {

                        return (
                            <ConversationBox
                                key={conversation.id}
                                data={conversation}
                                selected={conversationId === conversation.id}
                            />
                        )
                    })}
                </div>
            </aside>
        </>

    )
}

export default ConversationList
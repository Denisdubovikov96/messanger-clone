'use client'
import Avatar from '#/components/UI/Avatar'
import AvatarGroup from '#/components/UI/AvatarGroup'
import useOtherUser from '#/hooks/useOtherUser'
import { FullConversation } from '#/types'
import classNames from 'classnames'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ConversationBoxProps {
    selected?: boolean
    data: FullConversation
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = React.useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = React.useMemo(() => {
        const messages = data.messages || []

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = React.useMemo(() => {

        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = React.useMemo(() => {
        if (!lastMessage) {
            return false
        }

        const seenArr = lastMessage.seen || []

        if (!userEmail) {
            return false
        }

        return seenArr.filter((user) => user.email === userEmail).length !== 0
    }, [lastMessage, userEmail])

    const lastMessageText = React.useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an Image"
        }

        if (lastMessage?.body) {
            return lastMessage.body
        }
        return "Started a conversation"
    }, [lastMessage])

    return (
        <div
            className={classNames('w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3', selected ? "bg-neutral-100" : "bg-white")}
            onClick={handleClick}
        >
            {data.isGroup ?
                <AvatarGroup users={data.users} /> 
                :
                <Avatar user={otherUser} />
            }
            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none'>
                    <div className='flex justify-between items-center mb-1'>
                        <p className='text-md font-medium text-gray-900'>
                            {data.name || otherUser.name}
                        </p>

                        {lastMessage?.createdAt && (
                            <p className='text-xs font-light text-gray-400'>
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={classNames('truncate text-sm', hasSeen ? "text-gray-500" : "text-black font-medium")}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
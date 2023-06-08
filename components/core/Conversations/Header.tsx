'use client'

import Avatar from '#/components/UI/Avatar'
import AvatarGroup from '#/components/UI/AvatarGroup'
import useActiveList from '#/hooks/useActiveList'
import useOtherUser from '#/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface Props {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<Props> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation)
    const [drawer, setDrawerOpen] = React.useState(false)
    const { members } = useActiveList()

    const active = members.indexOf(otherUser?.email!) !== -1

    const statusText = React.useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return active ? "Active" : "Offline"
    }, [conversation, active])


    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawer}
                onClose={() => setDrawerOpen(false)}
            />
            <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
                <div className='flex gap-3 items-center'>
                    <Link
                        href={'/'}
                        className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                    >
                        <HiChevronLeft size={32} />
                    </Link>
                    {conversation.isGroup ?
                        <AvatarGroup users={conversation.users} />
                        :
                        <Avatar user={otherUser} />
                    }
                    <div className='flex flex-col'>
                        <div className=''>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className='text-sm font-light text-neutral-500'>
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
                />
            </div>
        </>

    )
}

export default Header
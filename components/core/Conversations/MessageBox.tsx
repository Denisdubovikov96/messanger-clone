'use client'

import Avatar from '#/components/UI/Avatar'
import { FullMessage } from '#/types'
import classNames from 'classnames'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import ImageModal from './ImageModal'

interface Props {
    isLast?: boolean
    data: FullMessage
}

const MessageBox: React.FC<Props> = ({ data, isLast }) => {
    const session = useSession()
    const [isOpen, setIsOpen] = React.useState(false)

    const isOwn = session.data?.user?.email === data.sender.email
    const seenList = (data.seen || []).filter((user) => user.email !== data.sender.email).map((user) => user.name).join(", ")

    const container = classNames("flex gap-3 p-4", isOwn && "justify-end")
    const avatar = classNames(isOwn && "order-2")
    const body = classNames("flex gap-2 flex-col", isOwn && "items-end")
    const message = classNames("text-sm w-fit overflow-hidden", isOwn ? "bg-sky-500 text-white" : "bg-gray-100", data.image ? "rounded-md-0" : "rounded-full py-2 px-3")

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-sm text-gray-500'>
                        {data.sender.name}
                    </div>
                    <div className='text-xs text-gray-400'>
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>

                <div className={message}>
                    <ImageModal
                        src={data.image}
                        isOpen={isOpen}
                        onClose={()=>setIsOpen(false)}
                    />
                    {data.image ?
                        <Image
                            onClick={() => setIsOpen(true)}
                            alt='mes-img'
                            height={288}
                            width={288}
                            src={data.image}
                            className='object-cover cursor-pointer hover:scale-110 transition translate'
                        />
                        :
                        <div>
                            {data.body}
                        </div>
                    }
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className='text-xs font-light text-gray-500'>
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox
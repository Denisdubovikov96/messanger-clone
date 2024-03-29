'use client'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface Props {
    users: User[]
}

const AvatarGroup: React.FC<Props> = ({ users = [] }) => {
    const sliced = users.slice(0, 3)

    const posMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }
    return (
        <div className='relative h-11 w-11 '>
            {sliced.map((user, i) => {
                return (
                    <div
                        key={user.id}
                        className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${posMap[i as keyof typeof posMap]}`}
                    >
                        <Image
                            fill
                            alt='avatar'
                            src={user.image || '/img/placeholder.png'}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default AvatarGroup
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface MobileItemProps {
    icon: any
    href: string
    onClick?: () => void
    active?: boolean
}

const MobileItem = ({ href, onClick, icon: Icon, active }: MobileItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <Link
            onClick={handleClick}
            href={href}
            className={classNames('group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hove:text-black hover:bg-gray-100', { ['bg-gray-100 text-black']: active })}
        >
            <Icon className='h-6 w-6' />
        </Link>
    )
}

export default MobileItem
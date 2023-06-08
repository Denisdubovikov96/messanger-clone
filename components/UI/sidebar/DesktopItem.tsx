import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

interface DesktopItemProps {
  label: string
  icon: any
  href: string
  onClick?: () => void
  active?: boolean
}

const DesktopItem = ({ href, onClick, icon: Icon, label, active }: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }
  return (
    <li onClick={handleClick}>
      <Link
       href={href}
       className={classNames('group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hove:text-black hover:bg-gray-100', {['bg-gray-100 text-black']: active})}
       >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only' >{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
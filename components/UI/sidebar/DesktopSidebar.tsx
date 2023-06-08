'use client'
import useRoutes from '#/hooks/useRoutes'
import { User } from '@prisma/client'
import React from 'react'
import Avatar from '../Avatar'
import DesktopItem from './DesktopItem'
import SettingsModal from './SettingsModal'

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  console.log(currentUser);
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = useRoutes()
  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        currentUser={currentUser}
        onClose={() => setIsOpen(false)}
      />
      <div
        className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-4 lg:overflow-x-auto lg:bg-white lg:border-r-[1px] lg:pb-2 lg:flex lg:flex-col justify-between'
      >
        <nav
          className='mt-4 flex flex-col justify-between'
        >
          <ul
            role='list'
            className='flex-col items-center space-y-1 list-none'
          >
            {routes.map((route) => {
              return (
                <DesktopItem
                  key={route.href}
                  label={route.label}
                  href={route.href}
                  onClick={route.onClick}
                  icon={route.icon}
                />
              )
            })}
          </ul>
        </nav>
        <nav
          className='mt-4 flex flex-col justify-between items-center'
        >
          <div
            onClick={() => setIsOpen(true)}
            className='cursor-pointer hove:opacity-75 transition'
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>

  )
}

export default DesktopSidebar
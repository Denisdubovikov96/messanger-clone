import getCurrentUser from '#/actions/getCurrentUser'
import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

type Props = {
    children: React.ReactNode
}

const SideBar = async ({ children }: Props) => {
    const currentUser = await getCurrentUser()

    return (
        <div
            className='h-full'
        >
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter/>
            <main className='lg:pl-20 h-full'>
                {children}
            </main>
        </div>
    )
}

export default SideBar
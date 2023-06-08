import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { HiChat } from 'react-icons/hi'
import { HiUsers, HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'


const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathname === "/conversations" || !!conversationId
        },
        {
            label: "Users",
            href: "/users",
            icon: HiUsers,
            active: pathname === "/users"
        },
        {
            label: "Chat",
            href: "#",
            icon: HiArrowLeftOnRectangle,
            // active: pathname === "/conversations" || !!conversationId,
            onClick: () => signOut()
        },

    ], [pathname, conversationId])

    return routes
}

export default useRoutes
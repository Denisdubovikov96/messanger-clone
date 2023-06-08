'use client'

import EmptyState from '#/components/core/EmptyState'
import useConversation from '#/hooks/useConversation'
import classNames from 'classnames'

type Props = {}

const Home = (props: Props) => {
    const { isOpen } = useConversation()


    return (
        <div
            className={classNames('lg:pl-80 h-full lg:block', isOpen ? "block" : "hidden")}
        >
            <EmptyState />
        </div>
    )
}

export default Home
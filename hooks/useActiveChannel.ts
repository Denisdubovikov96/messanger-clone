import useActiveList from "./useActiveList"
import { Channel, Members } from 'pusher-js';
import React from "react";
import { pusherClient } from "#/libs/pusher";


const useActiveChannel = () => {
    const { add, set, remove } = useActiveList()
    const [activeChannel, setChannel] = React.useState<Channel | null>(null)

    React.useEffect(()=>{
        let channel = activeChannel

        if(!channel) {
            channel = pusherClient.subscribe('presence-messenger')
            setChannel(channel)
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initial: string[] = []

            members.each((member: Record<string,any>) => initial.push(member.id))
            set(initial)
        })

        channel.bind('pusher:member_added', (member: Record<string,any>) => {
            add(member.id)
        })
        channel.bind('pusher:member_removed', (member: Record<string,any>) => {
            remove(member.id)
        })

        return () => {
            if(activeChannel) {
                pusherClient.unsubscribe('presence-messenger')
                setChannel(null)
            }
        }
    },[activeChannel,set,add,remove])
}

export default useActiveChannel
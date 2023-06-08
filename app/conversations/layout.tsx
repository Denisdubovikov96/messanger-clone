import getConversations from "#/actions/getConversations";
import getUsers from "#/actions/getUsers";
import ConversationList from "#/components/core/Conversations/ConversationList";
import SideBar from "#/components/UI/sidebar/SideBar";

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    const users = await getUsers()
    return (
        // @ts-expect-error Server Component
        <SideBar>
            <div className="h-full">
                <ConversationList initialItems={conversations} users={users}/>
                {children}
            </div>
        </SideBar>
    )
}
import getCurrentUser  from '#/actions/getCurrentUser';
import prisma  from '#/libs/prismadb';


const getConversations = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser?.id) {
        return []
    }

    try {
        const conversations = prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    }
                }
            }
        })
        
        return conversations
    } catch (error) {
        return []
    }
}

export default getConversations
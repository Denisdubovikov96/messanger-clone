import getCurrentUser from '#/actions/getCurrentUser';
import prisma from '#/libs/prismadb';


const getConversationById = async (conversationId: string) => {

    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.email) {
            return null
        }

        const conversation = prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            }
        })

        return conversation
    } catch (error) {
        return null
    }
}

export default getConversationById
import prisma from '#/libs/prismadb';
import getCurrentUser from '#/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { pusherServer } from '#/libs/pusher';
interface Params {
    conversationId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()

        if (!currentUser?.id) {
            return new NextResponse("Unauthorize", { status: 401 })
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!existingConversation) {
            return new NextResponse("Invalid Id", { status: 400 })
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (error) {
        console.log(error, "CONV_DELETE_ERROR");

        return new NextResponse("Internal error", { status: 500 })
    }
}
import getCurrentUser from '#/actions/getCurrentUser';
import prisma from '#/libs/prismadb';
import { NextResponse } from 'next/server'


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()

        const {
            image,
            name
        } = body

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name
            }
        })


        // if (isGroup && (!members || members.length < 2 || !name)) {
        //     return new NextResponse("Invalid data", { status: 400 })
        // }


        return NextResponse.json(updatedUser)

    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}
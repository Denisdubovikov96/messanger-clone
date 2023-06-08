import getUsers from "#/actions/getUsers";
import UserList from "#/components/core/User/UserList";
import SideBar from "#/components/UI/sidebar/SideBar";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {
    const users = await getUsers()

    return (
        // @ts-expect-error Server Component
        <SideBar>
            <div className="h-full">
                <UserList items={users }/>
                {children}
            </div>
        </SideBar>
    );
}
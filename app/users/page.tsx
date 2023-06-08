import EmptyState from '#/components/core/EmptyState';
// import Button from '#/components/UI/Button';
// import { signOut } from 'next-auth/react';

const Users = () => {
    return (
        <div className='hidden lg:block lg:pl-80 h-full'>
            {/* <Button onClick={() => signOut()}>
                Log out
            </Button> */}
            <EmptyState/>
        </div>
    );
}

export default Users
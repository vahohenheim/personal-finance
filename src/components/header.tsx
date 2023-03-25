import React from 'react';
import type { FC } from 'react';
import HeaderOnline from './header-online';
import type { User } from '../user.model';

const Header: FC<{ user: User}> = ({ user }) => {
    return (
        <header>
            {user ? <HeaderOnline user={user} /> : <></>}
        </header>
    )
}

export default Header;
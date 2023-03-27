import React, { useState } from 'react';
import type { FC } from 'react';
import type { User } from '../../user.model';
import { useSignOut } from '@nhost/react'
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const Header: FC<{ user: User}> = ({ user }) => {
    const { signOut } = useSignOut()
    const navigate = useNavigate();
    const [current, setCurrent] = useState('/');

    const MENU_ITEMS: MenuProps['items'] = [
        {
          label: 'dashboard',
          key: '/',
        },
        {
          label: 'profile',
          key: '/profile',
        },
        {
          label: 'logout',
          key: '',
          onClick: () => signOut()
        }
    ];

    const onClick: MenuProps['onClick'] = (info) => {
        console.log('click ', info);
        if(info.key) {
            setCurrent(info.key);
            navigate(info.key, { replace: true })
        }
    };
    
    return (
        <header className={styles.header}>
            <div className='container center-block'>
                {user ? <Menu onClick={onClick} selectedKeys={[current as string]} mode="horizontal" items={MENU_ITEMS} /> : <></>}
            </div>
        </header>
    )
}

export default Header;
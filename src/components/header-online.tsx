import React from 'react';
import type { FC } from 'react';
import { Button } from 'antd';
import { useSignOut, useUserId } from '@nhost/react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import type { User } from '../user.model';

const HeaderOnline: FC<{ user: User}> = ({ user }) => {
  const { signOut } = useSignOut()
  
  return (
    <nav>
      <h1>hello, {user?.displayName}</h1>
      <Link to='/'><Button type="link">Home</Button></Link>
      <Link to='/profile'><Button type="link">Profile</Button></Link>
      <Button type="link" onClick={() => signOut()}>Logout</Button>      
    </nav>
  )
}

export default HeaderOnline;
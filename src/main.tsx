import React from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom'
import Header from './components/header/header';
import { useUserId } from '@nhost/react'
import { gql, useQuery } from '@apollo/client'
import { User } from './user.model';
import Footer from './components/footer/footer';

const Main: FC = () => {
  const id = useUserId()

  const GET_USER_QUERY = gql`
    query GetUser($id: uuid!) {
      user(id: $id) {
        id
        email
        displayName
        metadata
        avatarUrl
      }
    }
  `

  const { loading, error, data } = useQuery<{ user: User }>(GET_USER_QUERY, {
    variables: { id },
    skip: !id
  })
  
  const user = data?.user


  return (
    <>
        <Header user={user} />
        <main className='main'>
          {error ? (
              <p>Something went wrong. Try to refresh the page.</p>
          ) : !loading ? (
              <Outlet context={{ user }} />
          ) : <p>loading</p>}
        </main>
        <Footer />
    </>
  )

};

export default Main;

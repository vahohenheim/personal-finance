import React from 'react';
import type { FC } from 'react';
import { useOutletContext } from 'react-router-dom'
import type { User } from '../user.model';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

const Dashboard: FC = () => {
    const { user } = useOutletContext<{ user: User }>();

    const GET_TRANSACTIONS_QUERY = gql`
        query GetTransactions {
            transactions {
                amount
                budget_id
                label
                type
                created_at
                updated_at
                id
                user_id
            }
        }
    `

  const { loading, error, data } = useQuery<{ transaction: Array<{ amount: number; }> }>(GET_TRANSACTIONS_QUERY)
  
  console.log('data', data)
  const transactions = data?.transaction

  console.log('transactions', transactions)

    return (
        <>
            <Helmet>
                <title>dashboard | finance</title>
            </Helmet>

            <div>
                <h1>Dashboard of {user?.displayName}</h1>
            </div>
        </>
        
    )
}

export default Dashboard;

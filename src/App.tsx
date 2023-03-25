import React, { Suspense } from 'react';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { NhostClient, NhostProvider } from '@nhost/react'
import 'antd/dist/reset.css';
import './App.css';
import { NhostApolloProvider } from '@nhost/react-apollo'
import Main from './main';

const nhost = new NhostClient({
  subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
  region: process.env.REACT_APP_NHOST_REGION
})

const Spinner = () => {
  return <h1>🌀 Loading...</h1>
}

const App: FC = () => {
  return (
    <div className="App">
      <NhostProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <Suspense fallback={<Spinner />}>
            <Main />
          </Suspense>
        </NhostApolloProvider>
      </NhostProvider>
      <Toaster />
    </div>
  )
};

export default App;

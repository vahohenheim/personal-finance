import React from 'react';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { NhostProvider } from '@nhost/react';
import { NhostApolloProvider } from '@nhost/react-apollo';
import Main from './main';
import { nhost } from './utils/nhost';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/react-query-client';
import { ConfigProvider, theme } from 'antd';

const App: FC = () => {
	return (
		<div className="App">
			<NhostProvider nhost={nhost}>
				<NhostApolloProvider nhost={nhost}>
					<QueryClientProvider client={queryClient}>
						<ConfigProvider
							theme={{
								algorithm: theme.darkAlgorithm,
							}}
						>
							<Main />
						</ConfigProvider>
					</QueryClientProvider>
				</NhostApolloProvider>
			</NhostProvider>
			<Toaster />
		</div>
	);
};

export default App;

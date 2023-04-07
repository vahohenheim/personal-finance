import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { NhostProvider } from '@nhost/react';
import { nhost } from './utils/nhost';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/react-query-client';
import { ConfigProvider, theme } from 'antd';
import MainLayout from './layouts/main/main';

const App: FC = () => {
	return (
		<>
			<NhostProvider nhost={nhost}>
				<QueryClientProvider client={queryClient}>
					<ConfigProvider
						theme={{
							algorithm: theme.darkAlgorithm,
						}}
					>
						<MainLayout />
					</ConfigProvider>
				</QueryClientProvider>
			</NhostProvider>
			<Toaster />
		</>
	);
};

export default App;

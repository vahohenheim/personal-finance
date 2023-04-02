import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { NhostProvider } from '@nhost/react';
import { nhost } from './utils/nhost';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/react-query-client';
import { ConfigProvider, theme } from 'antd';
import HeaderLayout from './layouts/header/header';
import FooterLayout from './layouts/footer/footer';
import { Outlet } from 'react-router-dom';

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
						<HeaderLayout />
						<main className="main">
							<Outlet />
						</main>
						<FooterLayout />
					</ConfigProvider>
				</QueryClientProvider>
			</NhostProvider>
			<Toaster />
		</>
	);
};

export default App;

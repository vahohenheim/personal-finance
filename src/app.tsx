import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { NhostProvider } from '@nhost/react';
import { nhost } from './utils/nhost';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/react-query-client';
import { ConfigProvider, theme } from 'antd';
import Header from './components/header/header';
import Footer from './components/footer/footer';
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
						<Header />
						<main className="main">
							<Outlet />
						</main>
						<Footer />
					</ConfigProvider>
				</QueryClientProvider>
			</NhostProvider>
			<Toaster />
		</>
	);
};

export default App;

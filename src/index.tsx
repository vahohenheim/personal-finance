import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as dayjs from 'dayjs';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import DashboardPage from './features/dashboard/dashboard';
import ProtectedRoute from './components/protected-route/protected-route';
import AddTransactionPage from './features/transactions/add/add';
import TransactionsPage from './features/transactions/transactions';
import DetailTransactionPage from './features/transactions/detail/detail';
import EditUserPage from './features/user/edit/edit';
import AddUserPage from './features/user/add/add';
import LoginPage from './features/user/login/login';

dayjs.locale('en');
dayjs.extend(utc);
dayjs.extend(timezone);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route
						index
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="transactions/add"
						element={
							<ProtectedRoute>
								<AddTransactionPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="transactions"
						element={
							<ProtectedRoute>
								<TransactionsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="transactions/:id"
						element={
							<ProtectedRoute>
								<DetailTransactionPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="user/edit"
						element={
							<ProtectedRoute>
								<EditUserPage />
							</ProtectedRoute>
						}
					/>
					<Route path="register" element={<AddUserPage />} />
					<Route path="login" element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

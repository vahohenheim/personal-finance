import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {
	BrowserRouter,
	Routes,
	Route,
	ScrollRestoration,
} from 'react-router-dom';
import * as dayjs from 'dayjs';
import 'dayjs/locale/en';
import AddTransactionPage from './pages/add-transaction/add-transaction';
import DashboardPage from './pages/dashboard/dashboard';
import ProfilePage from './pages/profile/profile';
import RegisterPage from './pages/register/register';
import LoginPage from './pages/login/login';
import ProtectedRoute from './components/protected-route/protected-route';
import TransactionsPage from './pages/transactions/transactions';
import TransactionPage from './pages/transaction/transaction';

dayjs.locale('en');

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
						path="add-transaction"
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
						path="transaction/:id"
						element={
							<ProtectedRoute>
								<TransactionPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route path="register" element={<RegisterPage />} />
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

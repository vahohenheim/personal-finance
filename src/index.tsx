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
import ViewTransactionsPage from './features/transactions/view/view';
import DetailTransactionPage from './features/transactions/detail/detail';
import EditUserPage from './features/user/edit/edit';
import AddUserPage from './features/user/add/add';
import LoginPage from './features/user/login/login';
import ViewCompaniesPage from './features/companies/view/view';
import DetailCompanyPage from './features/companies/detail/detail';
import AddCompanyPage from './features/companies/add/add';
import ViewBudgetsPage from './features/budgets/view/view';
import DetailBudgetPage from './features/budgets/detail/detail';

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
					<Route element={<ProtectedRoute />}>
						<Route index element={<DashboardPage />} />
						<Route
							path="budgets"
							element={<ViewBudgetsPage />}
						></Route>
						<Route
							path="budgets/:id"
							element={<DetailBudgetPage />}
						></Route>
						<Route
							path="transactions"
							element={<ViewTransactionsPage />}
						></Route>
						<Route
							path="transactions/add"
							element={<AddTransactionPage />}
						/>
						<Route
							path="transactions/:id"
							element={<DetailTransactionPage />}
						/>
						<Route
							path="companies"
							element={<ViewCompaniesPage />}
						></Route>
						<Route
							path="companies/add"
							element={<AddCompanyPage />}
						/>
						<Route
							path="companies/:id"
							element={<DetailCompanyPage />}
						/>
						<Route path="user/edit" element={<EditUserPage />} />
					</Route>

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

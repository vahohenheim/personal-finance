import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/reset.css';
import './styles/gui.css';
import './styles/global.css';
import './styles/ant-design.reset.css';
import './styles/helpers.css';
import App from './app';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
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
import RegisterPage from './features/register/register';
import LoginPage from './features/login/login';
import ViewCompaniesPage from './features/companies/view/view';
import DetailCompanyPage from './features/companies/detail/detail';
import AddCompanyPage from './features/companies/add/add';
import ViewBudgetsPage from './features/budgets/view/view';
import DetailBudgetPage from './features/budgets/detail/detail';
import EditTransactionPage from './features/transactions/edit/edit';
import EditCompanyPage from './features/companies/edit/edit';
import EditBudgetMonthPage from './features/budgets/edit/edit';
import DetailUserPage from './features/user/detail/detail';
import { NotFoundPage } from './features/not-found/not-found';
import ViewChestsPage from './features/chest/view/view';
import DetailChestPage from './features/chest/detail/detail';
import EditChestPage from './features/chest/edit/edit';
import AddChestPage from './features/chest/add/add';

dayjs.locale('en');
dayjs.extend(utc);
dayjs.extend(timezone);

const root = createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<NotFoundPage />} path="/" element={<App />}>
			<Route element={<ProtectedRoute />}>
				<Route index element={<DashboardPage />} />
				<Route path="budgets" element={<ViewBudgetsPage />}></Route>
				<Route
					path="budgets/:id"
					element={<DetailBudgetPage />}
				></Route>
				<Route
					path="budgets/:id/edit"
					element={<EditBudgetMonthPage />}
				></Route>
				<Route path="chests" element={<ViewChestsPage />}></Route>
				<Route path="chests/add" element={<AddChestPage />}></Route>
				<Route path="chests/:id" element={<DetailChestPage />}></Route>
				<Route
					path="chests/:id/edit"
					element={<EditChestPage />}
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
					path="transactions/:id/edit"
					element={<EditTransactionPage />}
				/>
				<Route path="companies" element={<ViewCompaniesPage />}></Route>
				<Route path="companies/add" element={<AddCompanyPage />} />
				<Route path="companies/:id" element={<DetailCompanyPage />} />
				<Route
					path="companies/:id/edit"
					element={<EditCompanyPage />}
				/>
				<Route path="user" element={<DetailUserPage />} />
				<Route path="user/edit" element={<EditUserPage />} />
			</Route>
			<Route path="register" element={<RegisterPage />} />
			<Route path="login" element={<LoginPage />} />
		</Route>
	)
);

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

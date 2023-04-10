import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import {
	BalanceBudgetComponent,
	ListBudgetComponent,
} from '../../../components/budget';
import { useGetBudgets } from '../../../api/budget/get-budgets.hook';
import { useUserId } from '@nhost/react';
import { useGetUser } from '../../../api/user/get-user.hook';
import { getCurrentMonthFromUser } from '../../../utils/get-current-month-from-user';

const ViewBudgetsPage = () => {
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const currentMonth = getCurrentMonthFromUser(getUser?.data?.user);
	const getBudgets = useGetBudgets(
		100,
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);
	const budgets = getBudgets.data?.budget || [];
	const loading = getBudgets.isLoading || getUser.isLoading;

	return (
		<>
			<Helmet>
				<title>budgets | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BalanceBudgetComponent
						loading={loading}
						currentMonth={currentMonth}
						budgets={budgets}
					/>
				</SectionComponent>
				<SectionComponent>
					<TitleComponent heading={'h2'}>Budgets</TitleComponent>
					<ListBudgetComponent budgets={budgets} loading={loading} />
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewBudgetsPage;

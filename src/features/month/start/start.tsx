import { Helmet } from 'react-helmet';
import { useGetBudgets } from '../../../api/budget/get-budgets.hook';
import { useGetUser } from '../../../api/user/get-user.hook';
import { getCurrentMonthFromUser } from '../../../utils/get-current-month-from-user';
import { useUserId } from '@nhost/react';
import { ItemSkeletonBudgetComponent } from '../../../components/budget/item/item.skeleton';
import { ListBudgetComponent } from '../../../components/budget';
import { Form } from 'antd';

export const StartMonthPage = () => {
	const userId = useUserId() as string;
	const getUser = useGetUser(userId);
	const currentMonth = getCurrentMonthFromUser(getUser?.data?.user);
	const getBudgets = useGetBudgets(
		100,
		currentMonth?.start_at as string,
		currentMonth?.end_at as string
	);

	// TODO: create new month
	// TODO: update user currentMonth
	// TODO: create all budgetMonth

	return (
		<>
			<Helmet>
				<title>start new month | finance</title>
			</Helmet>
			<div className="container center-block">
				<Form>
					<ListBudgetComponent
						budgets={getBudgets.data?.budget}
						loading={getBudgets.isLoading}
						settable={true}
					/>
				</Form>
			</div>
		</>
	);
};

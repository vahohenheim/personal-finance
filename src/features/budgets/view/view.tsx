import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListBudgetComponent } from '../../../components/budget';
import { useGetBudgets } from '../api/get-budgets.hook';

const ViewBudgetsPage = () => {
	const getBudgets = useGetBudgets(100);
	return (
		<>
			<Helmet>
				<title>budgets | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent heading={'h2'}>Budgets</TitleComponent>
					<ListBudgetComponent
						budgets={getBudgets.data?.budget}
						loading={getBudgets.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewBudgetsPage;

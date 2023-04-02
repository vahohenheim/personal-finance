import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../components/section/section';
import TitleComponent from '../../components/title/title';
import ListBudgetsComponent from './components/list/list';

const BudgetsPage = () => {
	return (
		<>
			<Helmet>
				<title>budgets | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/budgets/add">
								<Button type="primary" block={true}>
									Add budget
								</Button>
							</Link>
						}
					>
						Budgets
					</TitleComponent>
					<ListBudgetsComponent limit={100} />
				</SectionComponent>
			</div>
		</>
	);
};

export default BudgetsPage;

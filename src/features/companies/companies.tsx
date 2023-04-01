import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../components/section/section';
import TitleComponent from '../../components/title/title';
import ListCompaniesComponent from './components/list/list';

const CompaniesPage = () => {
	return (
		<>
			<Helmet>
				<title>companies | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/companies/add">
								<Button type="primary" block={true}>
									Add company
								</Button>
							</Link>
						}
					>
						Companies
					</TitleComponent>
					<ListCompaniesComponent />
				</SectionComponent>
			</div>
		</>
	);
};

export default CompaniesPage;

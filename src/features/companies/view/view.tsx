import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListCompaniesComponent } from '../../../components/company';
import { useGetCompanies } from '../../../api/company/get-companies.hook';
import { BackComponent } from '../../../components/back/back';

const ViewCompaniesPage = () => {
	const getCompanies = useGetCompanies();

	return (
		<>
			<Helmet>
				<title>companies | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
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
					<ListCompaniesComponent
						companies={getCompanies?.data?.company}
						loading={getCompanies.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewCompaniesPage;

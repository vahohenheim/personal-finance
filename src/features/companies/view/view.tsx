import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListCompaniesComponent } from '../../../components/company/list/list';
import { useGetCompanies } from '../api/get-companies.hook';

const ViewCompaniesPage = () => {
	const getCompanies = useGetCompanies();

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

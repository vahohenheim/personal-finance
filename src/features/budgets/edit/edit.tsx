import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { BackComponent } from '../../../components/back/back';
import { useGetBudget } from '../../../api/budget/get-budget.hook';
import { useUpdateBudgetMonth } from '../../../api/budget/update-budget-month.hook';
import { FormBudgetMonthComponent } from '../../../components/budget/form/form';
import { Budget } from '../../../gql/graphql';
import { FormBudgetMonthValues } from '../../../components/budget/form/form.model';
import dayjs from 'dayjs';
import { FormSkeletonBudgetMonthComponent } from '../../../components/budget/form/form.skeleton';

const EditBudgetMonthPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const getBudget = useGetBudget(id || '');
	const budget = getBudget.data?.budget[0] as Budget;
	const budgetMonth = budget?.budget_months[0];
	const updateBudget = useUpdateBudgetMonth(budgetMonth?.budget_id as string);

	const onFinish = (values: FormBudgetMonthValues) => {
		updateBudget.mutate({
			budget_id: budgetMonth?.budget_id || '',
			month_id: budgetMonth?.month_id || '',
			amount: values.amount,
		});
	};

	if (updateBudget.data) {
		toast.success('Edit budget month successfully', {
			id: 'budget-month-edited',
		});
		navigate(-1);
	}

	if (updateBudget.isError) {
		toast.error('Unable to edit budget month', {
			id: 'budget-month-edited',
		});
		console.error(updateBudget.error);
	}

	return (
		<>
			<Helmet>
				<title>edit budget month | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">
						Edit a budget month : {budget?.label}{' '}
						{dayjs(budgetMonth?.month.start_at as string).format(
							'MMMM YYYY'
						)}
					</TitleComponent>
					{getBudget.isLoading ? (
						<FormSkeletonBudgetMonthComponent />
					) : (
						<FormBudgetMonthComponent
							submitLabel={'edit budget month'}
							onFinish={onFinish}
							form={form}
							budgetMonth={budgetMonth}
							submitting={updateBudget.isLoading}
						/>
					)}
				</SectionComponent>
			</div>
		</>
	);
};

export default EditBudgetMonthPage;

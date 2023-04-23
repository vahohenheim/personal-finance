import { Card, Form, Input, InputNumber } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProgressComponent } from '../../progress/progress';
import styles from './item.module.css';
import { ItemInputBudgetComponentProps } from './item.model';
import { Budget_Month } from '../../../gql/graphql';

export const ItemInputBudgetComponent: FC<ItemInputBudgetComponentProps> = ({
	budget,
}) => {
	const currentMonthBudget: Budget_Month | undefined =
		budget?.budget_months && budget?.budget_months[0];

	return (
		<Link className={styles.link} to={`/budgets/${budget.id as string}`}>
			<Card>
				<div className={styles.body}>
					<p className={styles.label}>
						{budget?.icon} {budget?.label}
					</p>
					<p className={styles.amount}>
						<Form.Item name={budget.id}>
							<InputNumber
								prefix="€"
								size="large"
								placeholder="typing transaction amount"
								defaultValue={currentMonthBudget?.amount || 0}
								style={{ width: '100%' }}
							/>
						</Form.Item>
					</p>
				</div>
			</Card>
		</Link>
	);
};

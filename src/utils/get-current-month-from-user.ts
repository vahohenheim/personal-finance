import { User } from '../models/user';
import { Month } from '../gql/graphql';

export const getCurrentMonthFromUser = (user?: User): Partial<Month> => {
	if (
		user &&
		Array.isArray(user?.user_months) &&
		user.user_months.length > 0 &&
		user?.user_months[0]
	) {
		return user?.user_months[0].month;
	}
	return { start_at: '', end_at: '' };
};

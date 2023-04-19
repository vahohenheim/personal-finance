import { HeaderNavigationItem } from './header.model';

export const HEADER_NAVIGATION: Array<HeaderNavigationItem> = [
	{
		key: '',
		icon: '🖥',
		label: 'dasboard',
		link: '/',
	},
	{
		key: 'budgets',
		icon: '💰',
		label: 'budgets',
		link: '/budgets',
	},
	{
		key: 'chests',
		icon: '💎',
		label: 'chests',
		link: '/chests',
	},
	{
		key: 'transactions',
		icon: '💳',
		label: 'transactions',
		link: '/transactions',
	},
	{
		key: 'companies',
		icon: '🏢',
		label: 'companies',
		link: '/companies',
	},
];

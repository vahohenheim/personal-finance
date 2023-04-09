import { ReactNode } from 'react';

export type DetailCoverComponentProps = {
	icon: ReactNode;
	title: string;
	amount?: ReactNode;
	loading: boolean;
	hasBack?: boolean;
	className?: string;
	backgroundColor?: string;
};

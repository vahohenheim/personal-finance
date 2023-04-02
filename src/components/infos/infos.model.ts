import { ReactNode } from 'react';

export type InfosComponentProps = {
	infos: Array<Info>;
};

export type Info = {
	label: string;
	value: ReactNode | string;
};

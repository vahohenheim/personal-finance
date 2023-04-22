import { FC } from 'react';
import { IconComponentProps } from './icon.model';

export const CompanyIcon: FC<IconComponentProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill="#FFFFFF"
		className={className}
	>
		<path d="M21 10a1 1 0 0 0 1-1V6a.999.999 0 0 0-.684-.948l-9-3a1.002 1.002 0 0 0-.632 0l-9 3A.999.999 0 0 0 2 6v3a1 1 0 0 0 1 1h1v7.184A2.995 2.995 0 0 0 2 20v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a2.995 2.995 0 0 0-2-2.816V10Zm-1 11H4v-1a1.001 1.001 0 0 1 1-1h14a1.001 1.001 0 0 1 1 1ZM6 17v-7h2v7Zm4 0v-7h4v7Zm6 0v-7h2v7ZM4 8V6.72l8-2.666 8 2.667V8Z" />
	</svg>
);

import { FC } from 'react';
import { IconComponentProps } from './icon.model';

export const ChestIcon: FC<IconComponentProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill="#FFFFFF"
		className={className}
	>
		<path d="M19 7h-3V6a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3Zm-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V6Zm-6 4a1 1 0 0 1 1-1h1a2 2 0 0 1-2 2v-1Zm1 9a1 1 0 0 1-1-1v-1a2 2 0 0 1 2 2H5Zm15-1a1 1 0 0 1-1 1h-1a2 2 0 0 1 2-2v1Zm0-3a4 4 0 0 0-4 4H8a4 4 0 0 0-4-4v-2a4 4 0 0 0 4-4h8a4 4 0 0 0 4 4v2Zm0-4a2 2 0 0 1-2-2h1a1 1 0 0 1 1 1v1Zm-8 0a3 3 0 1 0 0 5.999A3 3 0 0 0 12 11Zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
	</svg>
);

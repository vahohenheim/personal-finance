import { FC } from 'react';
import { IconComponentProps } from './icon.model';

export const DatasIcon: FC<IconComponentProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill="#FFFFFF"
		className={className}
	>
		<path d="M8 16.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 2C8 2 4 3.37 4 6v12c0 2.63 4 4 8 4s8-1.37 8-4V6c0-2.63-4-4-8-4Zm6 16c0 .71-2.28 2-6 2s-6-1.29-6-2v-3.27A13.16 13.16 0 0 0 12 16a13.16 13.16 0 0 0 6-1.27V18Zm0-6c0 .71-2.28 2-6 2s-6-1.29-6-2V8.73A13.16 13.16 0 0 0 12 10a13.16 13.16 0 0 0 6-1.27V12Zm-6-4C8.28 8 6 6.71 6 6s2.28-2 6-2 6 1.29 6 2-2.28 2-6 2Zm-4 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
	</svg>
);

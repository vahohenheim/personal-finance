import { FC } from 'react';
import { IconComponentProps } from './icon.model';

export const SavingIcon: FC<IconComponentProps> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		fill="#FFFFFF"
		className={className}
	>
		<path d="M21.22 12a3 3 0 0 0 .78-2 3 3 0 0 0-3-3h-5.18A3 3 0 0 0 11 3H5a3 3 0 0 0-3 3 3 3 0 0 0 .78 2 3 3 0 0 0 0 4 3 3 0 0 0 0 4A3 3 0 0 0 2 18a3 3 0 0 0 3 3h14a3 3 0 0 0 2.22-5 3 3 0 0 0 0-4ZM11 19H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Zm0-4H5a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Zm8.69 11.71A.93.93 0 0 1 19 19h-5.18a2.87 2.87 0 0 0 0-2H19a1 1 0 0 1 1 1 1 1 0 0 1-.31.71Zm0-4A.93.93 0 0 1 19 15h-5.18a2.87 2.87 0 0 0 0-2H19a1 1 0 0 1 1 1 1 1 0 0 1-.31.71Zm0-4A.93.93 0 0 1 19 11h-5.18a2.87 2.87 0 0 0 0-2H19a1 1 0 0 1 1 1 1 1 0 0 1-.31.71Z" />
	</svg>
);

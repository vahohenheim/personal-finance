import { FC } from 'react';
import classNames from 'classnames';
import styles from './avatar.module.css';
import { AvatarUserComponentProps } from './avatar.model';
import { AvatarSkeletonUserComponent } from './avatar.skeleton';

export const AvatarUserComponent: FC<AvatarUserComponentProps> = ({
	loading = false,
	active = false,
	url,
	className,
}) => {
	const avatarClassName = classNames(
		styles.avatar,
		{
			[styles.active]: active,
		},
		className
	);

	if (loading) {
		return <AvatarSkeletonUserComponent />;
	}

	return (
		<div
			className={avatarClassName}
			style={{
				backgroundImage: url,
			}}
		></div>
	);
};

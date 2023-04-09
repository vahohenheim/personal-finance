import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SpinnerComponent: FC<{ size?: number }> = ({ size = 24 }) => {
	const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

	return <Spin indicator={antIcon} />;
};

export default SpinnerComponent;

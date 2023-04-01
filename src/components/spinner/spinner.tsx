import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SpinnerComponent: FC = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return <Spin indicator={antIcon} />;
};

export default SpinnerComponent;

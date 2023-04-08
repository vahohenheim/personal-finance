import SectionComponent from '../section/section';
import { Empty } from 'antd';
import { BackComponent } from '../back/back';

export const DetailEmptyComponent = () => {
	return (
		<div className="container center-block">
			<SectionComponent>
				<BackComponent />
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</SectionComponent>
		</div>
	);
};

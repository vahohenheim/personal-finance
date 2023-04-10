import { FC } from 'react';
import { DonutComponentProps } from './donut.model';
import styles from './donut.module.css';

export const DonutComponent: FC<DonutComponentProps> = ({
	size = 116,
	strokewidth = 26,
	value = 0,
}) => {
	const halfsize = size * 0.5;
	const radius = halfsize - strokewidth * 0.5;
	const circumference = 2 * Math.PI * radius;
	const strokeval = (value * circumference) / 100;
	const dashval = `${strokeval} ${circumference}`;
	const trackstyle = { strokeWidth: strokewidth };
	const indicatorstyle = {
		strokeWidth: strokewidth,
		strokeDasharray: dashval,
	};
	const rotateval = `rotate(-90 ${halfsize}, ${halfsize})`;

	return (
		<svg width={size} height={size} className={styles.donut}>
			<circle
				r={radius}
				cx={halfsize}
				cy={halfsize}
				transform={rotateval}
				style={trackstyle}
				className={styles.track}
			/>
			<circle
				r={radius}
				cx={halfsize}
				cy={halfsize}
				transform={rotateval}
				style={indicatorstyle}
				className={styles.indicator}
			/>
			<text className={styles.text} x={halfsize} y={halfsize}>
				{value}%
			</text>
		</svg>
	);
};

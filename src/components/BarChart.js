import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';

let scalesConfig = {
	x: {
		display: false
	},
	y: {
		min: 0,
		max: 10,
		display: true,
		ticks: {
			suggestedMin: 0,
			suggestedMax: 10,
			beginAtZero: true
		}
	}
};

function BarChart(props) {
	Chart.register(annotationPlugin);

	const chartRef = useRef(null);

	useEffect(() => {
		if (chartRef.current) {
			let bars = chartRef.current.data.datasets[0];

			for (let i = 0; i < bars.data.length; i++) {
				if (bars.data[i] < (props?.candidate?.average || 0)) {
					bars.backgroundColor[i] = 'rgba(255, 81, 81, 0.4)';
					bars.borderColor[i] = "rgba(255, 81, 81, 1)";
				}
				else {
					bars.backgroundColor[i] = 'rgba(0, 0, 0, 0.4)';
					bars.borderColor[i] = "rgba(0, 0, 0, 1)";
				}
			}
			chartRef.current.update();
		}
	}, [chartRef, props?.candidate?.average]);

	return (
		<div>
			<Bar ref={chartRef} height={150} width={60}
				data={{
					labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'],
					datasets: [{
						label: 'Waydev Grade',
						data: props?.candidate?.grades || [],
						backgroundColor: ["rgba(0,0,0,0.4)"],
						borderColor: ["rgba(0,0,0,1)"],
						borderWidth: 1,
						yAxisID: 'y',
					}]
				}}
				options={{
					scales: scalesConfig,
					maintainAspectRatio: false,
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							callbacks: {
								label: function (context) {
									var label = context.dataset.label || '';

									if (label) {
										label += '# ';
									}
									if (context.parsed.y !== null) {
										label = `Waydev Grade #[${context.parsed.y}]`;
									}
									return label;
								}
							}
						},
						annotation: {
							annotations: [
								{
									type: 'line',
									mode: 'horizontal',
									scaleID: 'y',
									value: (props?.candidate?.average).toFixed(2) || 0,
									borderColor: 'black',
									borderWidth: 2,
									label: {
										position: 'center',
										backgroundColor: 'rgba(255, 255, 255, 1)',
										color: 'black',
										content: (props?.candidate?.average).toFixed(2) || 0,
										enabled: true,
									},
								},
							],
						},
					},

				}}
			/>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		candidate: state.candidates[ownProps.index]
	}
};

export default connect(mapStateToProps)(BarChart);
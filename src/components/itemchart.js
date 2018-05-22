import React, { Component } from 'react';
import { RadialChart } from 'react-vis';

class ItemChart extends Component {
	constructor() {
		super();
		this.state = {
			data: [
					{angle: 0, color: '#D30000', name: '5%', value: '5'},
					{angle: 0, color: '#009AD6', name: '12%', value: '12'},
					{angle: 0, color: '#FFE300', name: '18%', value: '18'},
					{angle: 0, color: '#FF9200', name: '28%', value: '28'},
				  ],
			gst_5: 0,
			gst_12: 0,
			gst_18: 0,
			gst_28: 0,
			render: true
		}
	}

	componentDidMount() {
		this.renderChart();
	}

	componentWillReceiveProps() {

		this.setState({
					data: [
					{angle: 0, color: '#D30000', name: '5%', value: '5'},
					{angle: 0, color: '#009AD6', name: '12%', value: '12'},
					{angle: 0, color: '#FFE300', name: '18%', value: '18'},
					{angle: 0, color: '#FF9200', name: '28%', value: '28'},
				  		],
					gst_5: 0,
					gst_12: 0,
					gst_18: 0,
					gst_28: 0
				}, () => {

					this.renderChart();
					
				});
		
	}

	renderChart() {
		
		var count = 0;

		this.props.items.map(item => {
			if(item.gst === '5')
				this.setState({
					gst_5: this.state.gst_5++
				});
			else if(item.gst === '12')
				this.setState({
					gst_12: this.state.gst_12++
				});
			else if(item.gst === '18')
				this.setState({
					gst_18: this.state.gst_18++
				});
			else if(item.gst === '28')
				this.setState({
					gst_28: this.state.gst_28++
				});
			return null;
		});

		var data = this.state.data;
		
		data.map(d=> {
			if(d.value === '5')
				d.angle = this.state.gst_5;
			else if(d.value === '12')
				d.angle = this.state.gst_12;
			else if(d.value === '18')
				d.angle = this.state.gst_18;
			else if(d.value === '28')
				d.angle = this.state.gst_28;

			return null;
		})

		var newData = data.filter(d=> {
			if(d.angle === 0) {
				count++;
				return false;
			} else {
				return true;
			}
		});
		

		if(count === 4)
		{
			this.setState({
				render: false
			})
		}
		else {
			this.setState({
				render: true,
				data: newData
			})
		}
	}

	render() {
		return (
			<div className="item-chart">
				{this.state && this.state.data && this.state.render &&
					<RadialChart
						colorType={'literal'}
				        margin={{top: 100}}
				        getLabel={d => d.name}
				        data={this.state.data}
				        labelsRadiusMultiplier={1.1}
				        labelsStyle={{fontSize: 20, fill: '#222'}}
				        showLabels
				        style={{stroke: '#fff', strokeWidth: 2}}
				        width={400}
				        height={400} />
				}
				{this.state && !this.state.render &&
					<p> No data yet. </p>
				}
			</div>
		);
	}
}

export default ItemChart;
import React, { Component } from 'react';
import ItemTable from './itemtable';
import ItemChart from './itemchart';

class ItemData extends Component {

	constructor() {
		super();
		this.state = {
			itemtable: true,
			itemchart: false
		}
	}

	setTableDisplay = () => {
		this.setState({
			itemtable: true,
			itemchart: false
		})
	}

	setChartDisplay = () => {
		this.setState({
			itemtable: false,
			itemchart: true
		})
	}

	render() {
		return (
			<div className="item-data">
				<ul>
					<li onClick={this.setTableDisplay} className={this.state.itemtable ? 'active': null} > Table </li>
					<li onClick={this.setChartDisplay} className={this.state.itemchart ? 'active': null}> Chart </li>
				</ul>
				{this.state && this.state.itemtable &&
					<ItemTable items={this.props.items} />
				}
				{this.state && this.state.itemchart &&
					<ItemChart items={this.props.items} />
				}
			</div>
		);
	}
}

export default ItemData;
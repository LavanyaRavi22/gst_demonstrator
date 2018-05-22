import React, { Component } from 'react';

class ItemList extends Component {
	componentDidMount() {
		console.log(this.props.itemdetails);
	}

	render() {
		return (
			<tr className="item-list">
				<td> {this.props.itemdetails.name} </td>
				<td> &#x20B9;{this.props.itemdetails.price} </td>
				<td> {this.props.itemdetails.gst}% </td>
				<td> &#x20B9;{this.props.itemdetails.final_price} </td>
				<td> {new Date(this.props.itemdetails.timestamp).toLocaleString()} </td>
			</tr>
		);
	}
}

export default ItemList;
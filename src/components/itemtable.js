import React, { Component } from 'react';
import ItemList from './itemlist';

class ItemTable extends Component {

	render() {
		return (
			<div className="item-table">
				<table className="table">
					<thead>
						<tr>
							<th> Name </th>
							<th> Price </th>
							<th> GST </th>
							<th> Final Price </th>
							<th> Time added </th>
						</tr>
					</thead>
					<tbody>
						{this.props && this.props.items &&
							this.props.items.map((item,i) => {
								return <ItemList itemdetails = {item} key={i} />
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ItemTable;
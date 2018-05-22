import React, { Component } from 'react';
import ItemData from './itemdata';

class ItemForm extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			price: '',
			gst: '',
			final_price: null,
			items: []
		}
	}

	getItems = () => {

		fetch('https://gst-backend.herokuapp.com/allItems')
			.then(function(response) {
				return response.json();
			  }).then(response => {
			  	
			  	this.setState({
			  		items: response
			  	});

			  })

	}

	componentDidMount() {
		this.getItems();
	}

	nameChange = (event) => {
		this.setState({name: event.target.value}, () => {
			console.log(this.state.name);
		});
	}

	priceChange = (event) => {
		this.setState({price: event.target.value}, () => {
			console.log(this.state.price);
		});
	}

	handleRadioChange = (event) => {
		this.setState({gst: event.target.value}, () => {
			console.log(this.state.gst);
		});
	}

	itemSubmit = (event) => {
		event.preventDefault();
		if(this.state.name && this.state.price && this.state.gst) {
			console.log("Submit price");
			var data={
				expr : [
					Number(this.state.price) + Number(this.state.price * this.state.gst / 100)
				]
			}

			var self = this;

			fetch('http://api.mathjs.org/v4/', {
			    method: 'post',
			    body: JSON.stringify(data)
			  }).then(function(response) {
			    return response.json();
			  }).then(function(data){
			  	console.log(data);
			  	console.log(data.result[0]);
			  	console.log(Number(data.result[0]).toFixed(2));
			  	self.setState({
			  		final_price: Number(data.result[0]).toFixed(2)
			  	})
			  	self.saveDatabase();
			  	self.setState({
			  		name: '',
					price: '',
					gst: ''
			  	});
			  });
		} else {
			alert("Enter all details");
		}
	}

	saveDatabase = () => {
		//event.preventDefault();

		var self = this;

		var data = {
			name: this.state.name,
			price: this.state.price,
			gst: this.state.gst,
			final_price: this.state.final_price
		}

		console.log(data);
		console.log(JSON.stringify(data));

		fetch('https://gst-backend.herokuapp.com/item', {
				body: JSON.stringify(data),
			    method: 'POST',
			    headers: {
				    "Content-Type": "application/json"
				  }
			  }).then(function(response) {
			    console.log(response);
			    self.getItems();
			  });

		//this.getItems();

	}

	render() {
		return (
			<div>
				<p className="heading"> GST DEMONSTRATOR </p>
				<div className="item-form">
					<form>

						<label htmlFor="name" className="item-label"> Name </label>
						<input type="text" 
							   name="name" 
							   className="item-input" 
							   value={this.state.name} 
							   onChange={this.nameChange} />

						<label htmlFor="price" className="item-label"> Price </label>
						<input type="text" 
							   name="price" 
							   className="item-input" 
							   value={this.state.price}
							   onChange={this.priceChange} />

						<label htmlFor="gst" className="item-label"> GST </label>
						<label className="item-radio">
							<input type="radio" 
							       name="gst"
							       value="5"
							       checked={this.state.gst === '5'}
							       onChange={this.handleRadioChange} /> 
						  		5%
						</label>
						<label className="item-radio">
							<input type="radio" 
								   name="gst"
								   value="12"
							       checked={this.state.gst === '12'}
							       onChange={this.handleRadioChange}  /> 
						  		12%
						</label>
						<label className="item-radio">
							<input type="radio" 
								   name="gst" 
								   value="18"
							       checked={this.state.gst === '18'}
							       onChange={this.handleRadioChange}   /> 
						  		18%
						</label>
						<label className="item-radio">
							<input type="radio" 
								   name="gst" 
								   value="28"
							       checked={this.state.gst === '28'}
							       onChange={this.handleRadioChange}   /> 
						  		28%
						</label>

						<button className="item-submit" onClick={this.itemSubmit}> Submit </button>

						{this.state && this.state.final_price &&
							<div>
								<p className="final"> Final Price: 
									<span className="final-price"> 
										&#x20B9; {this.state.final_price} 
									</span> 
								</p>
							</div>
						}

					</form>
				</div>

				{this.state && this.state.items &&
					<ItemData items={this.state.items}/>
				}	  

        	</div>
		);
	}
}

export default ItemForm;
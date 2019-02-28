import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppSetting from './AppSetting';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class DisplayProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {products: ''};
  }

  componentDidMount(){
    axios.get(AppSetting.url + '/api/products?cmd=list')
      .then(response => {
        this.setState({products: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

	actionButton(cell, row) {
	  return (
      <div>
        <Link to={"edit/"+row.id} className="btn btn-primary">Edit</Link>&nbsp;
        <Link to={"del/"+row.id} className="btn btn-danger">Delete</Link>
      </div>
	  );
	}

  render() {
  	return (
	  	<BootstrapTable data={this.state.products} striped hover>
	      <TableHeaderColumn isKey={true} width="100" dataField='id' filter={ { type: 'TextFilter', delay: 1000 } }>ID</TableHeaderColumn>
	      <TableHeaderColumn dataField='code' filter={ { type: 'TextFilter', delay: 1000 } }>Code</TableHeaderColumn>
	      <TableHeaderColumn dataField='description' filter={ { type: 'TextFilter', delay: 1000 } }>Description</TableHeaderColumn>
	      <TableHeaderColumn dataField='short_description' filter={ { type: 'TextFilter', delay: 1000 } }>Short Description</TableHeaderColumn>
	      <TableHeaderColumn dataField='qty' filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Qty</TableHeaderColumn>
	      <TableHeaderColumn dataField='value' filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<=' ] } }>Value</TableHeaderColumn>
		  	<TableHeaderColumn width="200" dataFormat={this.actionButton} dataAlign="center">Actions</TableHeaderColumn>
	  	</BootstrapTable>
  	);
  }
}
export default DisplayProduct;
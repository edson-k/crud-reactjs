import React, { Component } from 'react';

class FormProduct extends Component {

	render() {
	    return (
		    <div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Code:</label>
		              <input type="text" className="form-control" required="required" value={this.props.thisObject.state.productCode} maxLength="10" onChange={this.props.thisObject.handleProductCodeChange} />
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.code}</div>
		            </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Description:</label><br />
		              <textarea className="form-control col-md-12" required="required" value={this.props.thisObject.state.productDescription} maxLength="150" onChange={this.props.thisObject.handleProductDescriptionChange}></textarea>
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.description}</div>
		            </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Short Description:</label>
		              <input type="text" className="form-control" value={this.props.thisObject.state.produtctShortDescription} maxLength="30" onChange={this.props.thisObject.handleProductShortDescriptionChange} />
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.shortDescription}</div>
		            </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Qty:</label>
		              <input type="text" className="form-control" required="required" value={this.props.thisObject.state.productQty} maxLength="10" onChange={this.props.thisObject.handleProductQtyChange} />
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.qty}</div>
		            </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Value:</label>
		              <input type="text" className="form-control" required="required" value={this.props.thisObject.state.productValue} maxLength="10" onChange={this.props.thisObject.handleProductValueChange} />
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.value}</div>
		            </div>
		          </div>
		        </div>
		        <div className="row">
		          <div className="col-md-6">
		            <div className="form-group">
		              <label>Product Status:</label><br />
		              <input type="radio" checked={this.props.thisObject.state.productStatus === "enable"} id="enable" value="enable" onClick={this.props.thisObject.handleProductStatusChange}/><label htmlFor="enable">Enable</label> &nbsp;&nbsp;
		              <input type="radio" checked={this.props.thisObject.state.productStatus === "disable"} id="disable" value="disable" onClick={this.props.thisObject.handleProductStatusChange}/><label htmlFor="disable">Disable</label>
		              <div className="invalid-feedback">{this.props.thisObject.state.errors.status}</div>
		            </div>
		          </div>
		        </div>
			</div>
	    );
	}
}
export default FormProduct;
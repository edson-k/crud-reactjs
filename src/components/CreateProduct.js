import React, {Component} from 'react';
import AppSetting from './AppSetting';
import axios from 'axios';
import $ from "jquery";

class CreateProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      productCode: '', 
      productDescription: '', 
      productQty: '', 
      produtctShortDescription: '', 
      productStatus: '', 
      productValue: '',
      errors: ''
    };

    this.handleProductCodeChange = this.handleProductCodeChange.bind(this);
    this.handleProductDescriptionChange = this.handleProductDescriptionChange.bind(this);
    this.handleProductShortDescriptionChange = this.handleProductShortDescriptionChange.bind(this);
    this.handleProductQtyChange = this.handleProductQtyChange.bind(this);
    this.handleProductValueChange = this.handleProductValueChange.bind(this);
    this.handleProductStatusChange = this.handleProductStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleProductCodeChange(event){
    this.setState({ productCode: event.target.value }); 
  }
  handleProductDescriptionChange(event){
    this.setState({ productDescription: event.target.value }); 
  }
  handleProductShortDescriptionChange(event){
    this.setState({ produtctShortDescription: event.target.value }); 
  }
  handleProductQtyChange(event){
    this.setState({ productQty: event.target.value }); 
  }
  handleProductValueChange(event){
    this.setState({ productValue: event.target.value }); 
  }
  handleProductStatusChange(event){
    this.setState({ productStatus: event.target.value }); 
  }
  handleSubmit(event){
    event.preventDefault();
    if (this.validateForm()) {
      const product = {
        code: this.state.productCode, 
        description: this.state.productDescription, 
        short_description: this.state.produtctShortDescription, 
        qty: this.state.productQty, 
        value: this.state.productValue,
        status: this.state.productStatus 
      }

      let uri = AppSetting.url + '/api/products';
      axios.post(uri, product).then((response) => {
        this.props.history.push('/display-item');
      });
    } else {
      $('.invalid-feedback').css({display:'block'});
    }
  }

  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.productCode) {
      formIsValid = false;
      errors["code"] = "*Please enter product code.";
    }

    if (!this.state.productDescription) {
      formIsValid = false;
      errors["description"] = "*Please enter product description.";
    }

    if (!this.state.produtctShortDescription) {
      formIsValid = false;
      errors["shortDescription"] = "*Please enter product short description.";
    }

    if (!this.state.productStatus) {
      formIsValid = false;
      errors["status"] = "*Please enter product status.";
    }

    if (!this.state.productValue) {
      formIsValid = false;
      errors["value"] = "*Please enter product value.";
    }

    if (typeof this.state.productValue !== "undefined") {
      if (!this.state.productValue.match(/^[0-9]+\.?[0-9]*$/)) {
        formIsValid = false;
        errors["value"] = "*Please enter valid value no.";
      }
    }

    if (!this.state.productQty) {
      formIsValid = false;
      errors["qty"] = "*Please enter product qty.";
    }

    if (typeof this.state.productQty !== "undefined") {
      if (!this.state.productQty.match(/^[0-9]*$/)) {
        formIsValid = false;
        errors["qty"] = "*Please enter valid qty no.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    return (
      <div>
        <h1>Create Product</h1>
        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Code:</label>
                <input type="text" className="form-control" required="required" maxLength="10" onChange={this.handleProductCodeChange} />
                <div className="invalid-feedback">{this.state.errors.code}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Description:</label><br />
                <textarea className="form-control col-md-12" required="required" maxLength="150" onChange={this.handleProductDescriptionChange}></textarea>
                <div className="invalid-feedback">{this.state.errors.description}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Short Description:</label>
                <input type="text" className="form-control" maxLength="30" onChange={this.handleProductShortDescriptionChange} />
                <div className="invalid-feedback">{this.state.errors.shortDescription}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Qty:</label>
                <input type="text" className="form-control" required="required" maxLength="10" onChange={this.handleProductQtyChange} />
                <div className="invalid-feedback">{this.state.errors.qty}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Value:</label>
                <input type="text" className="form-control" required="required" maxLength="10" onChange={this.handleProductValueChange} />
                <div className="invalid-feedback">{this.state.errors.value}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Status:</label><br />
                <input type="radio" name="this.state.productStatus" id="enable" value="enable" onClick={this.handleProductStatusChange}/><label htmlFor="enable">Enable</label> &nbsp;&nbsp;
                <input type="radio" name="this.state.productStatus" id="disable" value="disable" onClick={this.handleProductStatusChange}/><label htmlFor="disable">Disable</label>
                <div className="invalid-feedback">{this.state.errors.status}</div>
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <button className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    )
  }
}
export default CreateProduct;
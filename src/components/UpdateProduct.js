import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppSetting from './AppSetting';
import $ from "jquery";
import validateForm from './ValidationForm';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productCode: '', 
      productDescription: '', 
      produtctShortDescription: '', 
      productQty: '', 
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

  componentDidMount(){
    axios.get(AppSetting.url + '/api/products/?cmd=details&id='+this.props.match.params.id)
    .then(response => {
      this.setState({
        productCode: response.data.code, 
        productDescription: response.data.description, 
        produtctShortDescription: response.data.short_description, 
        productQty: String(response.data.qty), 
        productValue: response.data.value,
        productStatus: response.data.status 
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm(this.state);
    this.setState({ errors: errors });
    if (!Object.keys(errors).length) {
      const product = {
        code: this.state.productCode, 
        description: this.state.productDescription, 
        short_description: this.state.produtctShortDescription, 
        qty: parseInt(this.state.productQty), 
        value: this.state.productValue,
        status: this.state.productStatus 
      }
      let uri = AppSetting.url + '/api/products/'+this.props.match.params.id;
      axios.put(uri, product).then((response) => {
        this.props.history.push('/display-item');
      });
    } else {
      $('.invalid-feedback').css({display:'block'});
    }
  }

  render(){
    return (
      <div>
        <h1>Update Product</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/display-item" className="btn btn-success">Return to Products</Link>
          </div>
        </div>
        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Code:</label>
                  <input type="text" className="form-control" required="required" value={this.state.productCode} maxLength="10" onChange={this.handleProductCodeChange} />
                  <div className="invalid-feedback">{this.state.errors.code}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Description:</label><br />
                  <textarea className="form-control col-md-12" required="required" value={this.state.productDescription} maxLength="150" onChange={this.handleProductDescriptionChange}></textarea>
                  <div className="invalid-feedback">{this.state.errors.description}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Short Description:</label>
                  <input type="text" className="form-control" value={this.state.produtctShortDescription} maxLength="30" onChange={this.handleProductShortDescriptionChange} />
                  <div className="invalid-feedback">{this.state.errors.shortDescription}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Qty:</label>
                  <input type="text" className="form-control" required="required" value={this.state.productQty} maxLength="10" onChange={this.handleProductQtyChange} />
                  <div className="invalid-feedback">{this.state.errors.qty}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Value:</label>
                  <input type="text" className="form-control" required="required" value={this.state.productValue} maxLength="10" onChange={this.handleProductValueChange} />
                  <div className="invalid-feedback">{this.state.errors.value}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Status:</label><br />
                  <input type="radio" checked={this.state.productStatus === "enable"} id="enable" value="enable" onClick={this.handleProductStatusChange}/><label htmlFor="enable">Enable</label> &nbsp;&nbsp;
                  <input type="radio" checked={this.state.productStatus === "disable"} id="disable" value="disable" onClick={this.handleProductStatusChange}/><label htmlFor="disable">Disable</label>
                  <div className="invalid-feedback">{this.state.errors.status}</div>
                </div>
              </div>
            </div>
            <br />
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
    )
  }
}
export default UpdateProduct;
import React, {Component} from 'react';
import AppSetting from './AppSetting';
import axios from 'axios';
import $ from "jquery";
import validateForm from './ValidationForm';
import FormProduct from './FormProduct';

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
    const errors = validateForm(this.state);
    this.setState({ errors: errors });
    if (!Object.keys(errors).length) {
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

  render() {
    return (
      <div>
        <h1>Create Product</h1>
        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
          <FormProduct thisObject={this}/>
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
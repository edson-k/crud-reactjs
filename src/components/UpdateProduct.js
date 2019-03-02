import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AppSetting from './AppSetting';
import $ from "jquery";
import validateForm from './ValidationForm';
import FormProduct from './FormProduct';

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
      }).catch(function (error) {
        console.log(error);
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
          <FormProduct thisObject={this}/>
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
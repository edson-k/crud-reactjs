import React, { Component } from 'react';
import axios from 'axios';
import AppSetting from './AppSetting';

class DeleteProduct extends Component {

  componentDidMount(){
    let uri = AppSetting.url + '/api/products/'+this.props.match.params.id;
    axios.delete(uri).then((response) => {
      this.props.history.push('/');
      this.props.history.push('/display-item');
    });
  }

  render() {
    return ( 
      <div></div> 
    );
  }

}

export default DeleteProduct;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CreateProduct from './components/CreateProduct';
import DisplayProduct from './components/DisplayProduct';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';

import './css/app.css';
import './css/react-bootstrap-table.min.css';

const MainMenu = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item nav-link"><Link to="/">Home</Link></li>
          <li className="nav-item nav-link"><Link to="add-item">Create Product</Link></li>
          <li className="nav-item nav-link"><Link to="display-item">Products</Link></li>
        </ul>
      </nav>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="appContainer">
          <MainMenu />
          <br />
          <Route path="/add-item" component={CreateProduct} />
          <Route path="/display-item" component={DisplayProduct} />
          <Route path="/edit/:id" component={UpdateProduct} />
          <Route path="/del/:id" component={DeleteProduct} />
        </div>
      </Router>
    );
  }
}
export default App;
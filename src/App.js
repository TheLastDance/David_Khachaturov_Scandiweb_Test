import { PureComponent } from 'react';
import './App.scss';
import Navbar from './components/Navbar.jsx'
import ItemList from './components/ItemList';
import ProductsDetails from './components/ProductsDetails';
import CartPage from './components/CartPage';


class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <Navbar />
        <ItemList />
        <ProductsDetails />
        <CartPage />
      </div>
    )
  }
}



export default App;


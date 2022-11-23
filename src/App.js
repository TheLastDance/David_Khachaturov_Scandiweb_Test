import { PureComponent } from 'react';
import './App.scss';
import Navbar from './components/Navbar.jsx'
import ItemList from './components/ItemList';
import ProductsDetails from './components/ProductsDetails';
import CartPage from './components/CartPage';
import { Route, Switch, Redirect } from 'react-router-dom';



class App extends PureComponent {

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path='/category/:name' render={(props) => <ItemList {...props} />}></Route>
          <Route path='/' exact >
            <Redirect to='/category/all' />
          </Route>
          <Route path='/products/:id' render={(props) => <ProductsDetails {...props} />}></Route>
          <Route path='/cart'><CartPage /></Route>
        </Switch>
      </>
    )
  }
}



export default App;


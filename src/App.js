import { PureComponent } from 'react';
import './App.scss';
import { connect } from "react-redux";
import { testReducer } from './store/mainSlice';
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemList from './components/ItemList';
import ProductsDetails from './components/ProductsDetails';

class App extends PureComponent {

  render() {
    //тут надо будет писать стейт для смены курса чтобы нормально передать обоим элементам в виде пропса или можно прописать в редуксе(лучше в редуксе)
    return (
      <div className="App">
        <Navbar/>
        <ItemList/>
        <ProductsDetails/>
        {/* <button onClick={() => this.props.testReducer()}>Press me</button>
        <p>{this.props.test}</p> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  test: state.redux.test
});

const mapDispatchToProps = { testReducer };

export default connect(mapStateToProps, mapDispatchToProps)(App);

// query test{
// 	categories{
//     name
//     products{
//       id
//       name
//       inStock
//       gallery
//       description
//       category
//       attributes{
//         id
//         name
//         type
//         items{
//           displayValue
//           value
//           id
//         }
//       }
//       prices{
//         currency{
//           label
//           symbol
          
//         }
//         amount
//       }
//       brand
//     }
//   }
// }

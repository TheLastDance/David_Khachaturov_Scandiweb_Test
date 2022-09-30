import { PureComponent } from 'react';
import './App.scss';
import { connect } from "react-redux";
import { testReducer } from './store/mainSlice';
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemList from './components/ItemList';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <Navbar/>
        <ItemList/>
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

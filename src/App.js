import { PureComponent } from 'react';
import './App.scss';
import { connect } from "react-redux";
import { testReducer } from './store/mainSlice';
import Navbar from './components/Navbar.jsx'
import { BrowserRouter } from "react-router-dom";

class App extends PureComponent {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar/>
        {/* <button onClick={() => this.props.testReducer()}>Press me</button>
        <p>{this.props.test}</p> */}
      </div>
      </BrowserRouter>
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

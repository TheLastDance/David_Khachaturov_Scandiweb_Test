import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { MAIN_CATEGORY } from '../server/queries';
import { ReactComponent as HomeLogo } from '../svg_folder/homeLogo_svg.svg';
import { ReactComponent as CartIcon } from '../svg_folder/cartIcon.svg';
import SelectCurrency from './selectCurrency.jsx';
import React from 'react';
import CartOverlay from './CartOverlay.jsx';
import { connect } from 'react-redux';
import { changeCurrency } from '../store/mainSlice';
import { Link } from 'react-router-dom';



//Navbar section
class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggleCart: false,
            toggleCurrency: false,
        };
        this.box = React.createRef(); //for outside click
        this.boxMiniCart = React.createRef(); //for outside click MiniCart
    }

    changeCurrency = (symbol) => {
        this.props.changeCurrency(symbol); // comes from redux
        this.setState(prev => ({
            toggleCurrency: !prev.toggleCurrency
        }));
    } //this function will change currency and prices of items depending on chosen currency symbol. Currency symbol state from redux will be saved in localstorage 


    toggling = () => {
        this.setState(prev => ({
            toggleCurrency: !prev.toggleCurrency
        }));
    } //will toggle currency menu

    componentDidMount() {
        document.addEventListener('mousedown', this.outsideClickCurrency);
        document.addEventListener('mousedown', this.outsideClickCart);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.outsideClickCurrency);
        document.removeEventListener('mousedown', this.outsideClickCart);
    }

    outsideClickCurrency = (event) => {
        if ((this.box && !this.box.current.contains(event.target)) && this.state.toggleCurrency) {
            this.setState({ toggleCurrency: false });
        }
    } // this function with ref will detect click outside of our box.(currency switcher)

    outsideClickCart = (event) => {
        if ((this.boxMiniCart.current && !this.boxMiniCart.current.contains(event.target)) && this.state.toggleCart) {
            this.setState({ toggleCart: false });
        }
    } // this function with ref will detect click outside of our box.(cart toggle)


    componentDidUpdate(nextProps, nextState) {
        if (nextState.toggleCart !== this.state.toggleCart) {
            if (this.state.toggleCart) {
                document.querySelector('body').style.background = 'rgba(57, 55, 72, 0.22)'
                document.querySelector('body').style.transition = 'ease-in 0.2s'
            } else {
                document.querySelector('body').style.background = '#FFFFFF';
            }
        }
    }// grey body color on cart click

    render() {
        console.log(this.state.toggleCurrency, this.state.toggleCart);
        return (
            <nav id='navbar' className='navbar'>
                <Query query={MAIN_CATEGORY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const category = data.categories;

                        return <div className='navbar_2'>
                            <div className='nav_links'>{category.map((item, index) => <Link key={index} to={`/category/${item.name}`}>{item.name.toUpperCase()}</Link>)}</div>
                            <div className='homeLogo'><Link to='/'><HomeLogo /></Link></div>
                            <div className='Currency_CartLogo'>
                                <SelectCurrency
                                    box={this.box}
                                    toggling={this.toggling}
                                    changeCurrency={this.changeCurrency}
                                    toggleCurrency={this.state.toggleCurrency}
                                    currencySymbol={this.props.currencySymbol}
                                />
                                <div className='cart' ref={this.boxMiniCart}>
                                    <CartIcon onClick={() => this.setState(prev => ({ toggleCart: !prev.toggleCart }))} />
                                    {this.props.totalQuantity > 0 && <div className='total_quantity' onClick={() => this.setState(prev => ({ toggleCart: !prev.toggleCart }))}>{this.props.totalQuantity}</div>}
                                    {this.state.toggleCart && <CartOverlay />}
                                </div>
                            </div>
                        </div>
                    }}
                </Query>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    totalQuantity: state.redux.totalQuantity,
    currencySymbol: state.redux.currency,
});

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


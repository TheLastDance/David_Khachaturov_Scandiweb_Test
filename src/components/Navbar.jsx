import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { MAIN_CATEGORY } from '../server/queries';
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from '../svg_folder/homeLogo_svg.svg';
import { ReactComponent as CartIcon } from '../svg_folder/cartIcon.svg';
import SelectCurrency from './selectCurrency.jsx';
import React from 'react';



class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggleCart: false,
        };
        this.box = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }
    handleOutsideClick = (event) => {
        if (this.box && !this.box.current.contains(event.target) && this.state.toggleCart) {
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
        return (
            <nav id='navbar' className='navbar'>
                <Query query={MAIN_CATEGORY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const category = data.categories;

                        return <div className='navbar_2'>
                            <div className='nav_links'>{category.map((item, index) => <a key={index} href={`/${item.name}`}>{item.name.toUpperCase()}</a>)}</div>
                            <div className='homeLogo'><a href={`/`}><HomeLogo /></a></div>
                            <div className='Currency_CartLogo'>
                                <SelectCurrency />
                                <div className='cart' ref={this.box} onClick={() => this.setState(prev => ({ toggleCart: !prev.toggleCart }))}>
                                    <CartIcon />
                                    {this.state.toggleCart &&
                                        <div className='cart_overlay'>
                                            <div className='total_amount'>
                                                <div><p>Total</p></div>
                                                <div><p>variable</p></div>
                                            </div>
                                            <div className='cart_buttons'>
                                                <button>VIEW BAG</button>
                                                <button>CHECK OUT</button>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    }}
                </Query>
            </nav>
        )
    }
}

export default Navbar;

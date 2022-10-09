import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ItemsInCart from './ItemsInCart';



class CartPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1),
        };
    }


    render() {
        return (
            <div className='cart_page'>
                {this.state.url === 'cart' && <div className='cart_page_2'>
                    <h1>CART</h1>
                    <ItemsInCart />
                </div>}
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency,
    totalQuantity: state.redux.totalQuantity,
    totalPriceAll: state.redux.totalPriceAll,
});

export default connect(mapStateToProps)(CartPage);
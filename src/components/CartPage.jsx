import { PureComponent } from 'react';
import { connect } from 'react-redux';
import ItemsInCart from './ItemsInCart';


//Cart page section
class CartPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1), //current pathname
        };
    }

    render() {
        return (
            <div className='cart_page'>
                <div className='cart_page_2'>
                    <h1>CART</h1>
                    <ItemsInCart />
                    <div className='order_info'>
                        <div className='order_info_2'>
                            <div className='order_info_2_text'>
                                <p>Tax 21%:</p>
                                <p>Quantity:</p>
                                <p>Total:</p>
                            </div>
                            <div className='order_info_2_numbers'>
                                <p>{this.props.currencySymbol}{(Math.round((Number(this.props.totalPriceAll) * 0.21) * 100) / 100).toFixed(2)}</p>
                                {/* here I change type of my props to number, just to avoid bugs where could be strings calculations */}
                                <p>{this.props.totalQuantity}</p>
                                <p>{this.props.currencySymbol}{this.props.totalPriceAll}</p>
                            </div>
                        </div>
                        <button className='button_order'>ORDER</button>
                    </div>
                </div>
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
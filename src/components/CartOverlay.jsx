import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemsInCart from './ItemsInCart';



//Cart overlay section
class CartOverlay extends PureComponent {

    render() {
        return (
            <div className='cart_overlay'>
                <div className='total_items'><span>My Bag,</span> {this.props.totalQuantity} items</div>
                <ItemsInCart />
                <div className='total_amount'>
                    <div><p>Total</p></div>
                    <div><p>{this.props.currencySymbol}{this.props.totalPriceAll}</p></div>
                </div>
                <div className='cart_buttons'>
                    <Link to='/cart' onClick={this.props.toggling}>VIEW BAG</Link>
                    <button>CHECK OUT</button>
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

export default connect(mapStateToProps)(CartOverlay);
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartFromItemList } from '../store/mainSlice';
import { ReactComponent as EmptyCart } from '../svg_folder/Empty Cart.svg';



//This part of code will render each product in PLP
class ItemCard extends PureComponent {

    preventD = (e) => {
        e.preventDefault();
    }//this function will turn off anchors link to PDP when user will add product to cart from PLP.

    render() {
        const moneyFilter = this.props.item.prices.filter(item => item.currency.symbol === this.props.currencySymbol)[0];
        // price filter according to chosen currency (which is saved in redux and localstorage)
        return (
            <Link to={`/products/${this.props.item.id}`} className={!this.props.item.inStock ? 'item_disabled' : null}>
                <div className='item_card_photo'>
                    <img className='photo_2' src={this.props.item.gallery[0]} alt={this.props.item.name} />
                    {!this.props.item.inStock && <p className='out_of_stock'>OUT OF STOCK</p>}
                </div>
                <div className='item_card_info'>
                    <div className='item_card_info_name'>
                        <p>{`${this.props.item.brand} ${this.props.item.name}`}</p>
                    </div>
                    <div className='item_card_info_price'>
                        <p>{`${moneyFilter.currency.symbol}${moneyFilter.amount.toFixed(2)}`}</p>
                    </div>
                </div>
                {this.props.item.inStock && <div onClick={this.preventD} className='item_cart'><div onClick={() => this.props.addToCartFromItemList({ item: this.props.item })}><EmptyCart /></div></div>}
            </Link>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

const mapDispatchToProps = { addToCartFromItemList };

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);



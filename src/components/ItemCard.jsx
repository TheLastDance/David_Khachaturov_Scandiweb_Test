import { PureComponent } from 'react';
import { connect } from 'react-redux';
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
            <a href={this.props.item.id} className={!this.props.item.inStock ? 'item_disabled' : ''}>
                <div style={{ background: `url(${this.props.item.gallery[0]})` }} className='item_card_photo'>
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
            </a>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

const mapDispatchToProps = { addToCartFromItemList };

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);



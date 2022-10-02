import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as EmptyCart } from '../svg_folder/Empty Cart.svg';


class ItemCard extends PureComponent {

    render() {
        const moneyFilter = this.props.item.prices.filter(item => item.currency.symbol === this.props.currencySymbol)[0];
        return (
            <a href={this.props.item.id}>
                <div style={{ background: `url(${this.props.item.gallery[0]})` }} className='item_card_photo'></div>
                <div className='item_card_info'>
                    <div className='item_card_info_name'>
                        <p>{`${this.props.item.brand} ${this.props.item.name}`}</p>
                    </div>
                    <div className='item_card_info_price'>
                        <p>{`${moneyFilter.currency.symbol}${moneyFilter.amount}`}</p>
                    </div>
                </div>
                <div onClick={(e) => e.preventDefault()} className='item_cart'><EmptyCart /></div>
            </a>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

export default connect(mapStateToProps)(ItemCard);



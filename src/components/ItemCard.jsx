import { PureComponent } from 'react';
import { connect } from 'react-redux';


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
            </a>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

export default connect(mapStateToProps)(ItemCard);



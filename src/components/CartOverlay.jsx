import { PureComponent } from 'react';
import { connect } from 'react-redux';


class CartOverlay extends PureComponent {

    render() {
        return (
            <div className='cart_overlay'>
                <div className='total_items'>My Bag, {this.props.totalQuantity} items</div>
                {this.props.cartList.map((item, index) => <div key={index} className='cart_overlay_item'>
                    <div className='cart_overlay_item_info'>
                        <p className='product_info_brand'>{item.brand}</p>
                        <p className='product_info_name'>{item.name}</p>
                        <p>{this.props.currencySymbol}{item.prices.filter(item => item.currency.symbol === this.props.currencySymbol)[0].amount * item.quantity}</p>
                        <div className='product_info_attributes'>
                            {item.attributes.map((item2, index2) => item2.type === 'swatch' ?
                                <div className='swatch' key={index2}>
                                    <p>{`${item2.name}:`}</p>
                                    <div>{item2.items.map((item3, index3) => <div
                                        className='swatch_2'
                                        title={item3.displayValue}
                                        key={index3}
                                        style={item.attributes[index2].items.filter(item4 => item4.id === item.selectedAttributes[index2].id)[0].id === item.selectedAttributes[index2].id ? { border: '1px solid #5ECE7B' } : {}}> <div style={{ background: item3.value, border: '1px solid grey' }}></div> </div>)}
                                    </div>
                                    {/* item2.filter((item4, index4) => item4.name === item.selectedAttributes[index4].name)[0].id === item.selectedAttributes[index2].id */}
                                </div> :
                                <div className='text' key={index2}>
                                    <p>{`${item2.name}:`}</p>
                                    <div>{item2.items.map((item3, index3) => <div
                                        className='text_2'
                                        title={item3.displayValue}
                                        key={index3}
                                    >{item3.value}</div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>)
                }
                <div className='total_amount'>
                    <div><p>Total</p></div>
                    <div><p>variable</p></div>
                </div>
                <div className='cart_buttons'>
                    <button>VIEW BAG</button>
                    <button>CHECK OUT</button>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency,
    cartList: state.redux.cartList,
    totalQuantity: state.redux.totalQuantity,
});

export default connect(mapStateToProps)(CartOverlay);
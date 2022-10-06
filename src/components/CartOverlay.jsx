import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduceQuantity, removeFromCart } from '../store/mainSlice';


class CartOverlay extends PureComponent {

    render() {
        return (
            <div className='cart_overlay'>
                <div className='total_items'><span>My Bag,</span> {this.props.totalQuantity} items</div>
                <div className='for_scroll'>
                    {this.props.cartList.map((item, index) => <div key={index} className='cart_overlay_item'>
                        <div className='cart_overlay_item_info'>
                            <p className='product_info_brand'>{item.brand}</p>
                            <a href={item.id} className='product_info_name'>{item.name}</a>
                            <p className='product_info_price'>{this.props.currencySymbol}{item.totalPrice}</p>
                            <div className='product_info_attributes'>
                                {item.attributes.map((item2, index2) => item2.type === 'swatch' ?
                                    <div className='swatch' key={index2}>
                                        <p>{`${item2.name}:`}</p>
                                        <div>{item2.items.map((item3, index3) => <div
                                            className='swatch_2'
                                            title={item3.displayValue}
                                            key={index3}
                                            style={item.attributes[index2].items[index3].id === item.selectedAttributes[index2].id ? { border: '1px solid #5ECE7B' } : {}}> <div style={{ background: item3.value, border: '1px solid grey' }}></div> </div>)}
                                        </div>
                                    </div> :
                                    <div className='text' key={index2}>
                                        <p>{`${item2.name}:`}</p>
                                        <div>{item2.items.map((item3, index3) => <div
                                            className='text_2'
                                            title={item3.displayValue}
                                            key={index3}
                                            style={item.attributes[index2].items[index3].id === item.selectedAttributes[index2].id ? { background: '#1D1F22', color: 'white' } : { background: 'white', color: '#1D1F22' }}
                                        >{item3.value}</div>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='quantity_and_photo'>
                            <div className='add_decrease_quantity'>
                                <div className='add' onClick={() => this.props.reduceQuantity({ item })}>
                                    +
                                </div>
                                <div className='quantity_number'>{item.quantity}</div>
                                <div className='decrease' onClick={() => this.props.removeFromCart({ item })}>
                                    -
                                </div>
                            </div>
                            <div className='cart_photo'>
                                <img src={item.gallery[0]} alt={item.name} />
                            </div>
                        </div>
                    </div>)
                    }
                </div>
                <div className='total_amount'>
                    <div><p>Total</p></div>
                    <div><p>{this.props.currencySymbol}{this.props.totalPriceAll}</p></div>
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
    totalPriceAll: state.redux.totalPriceAll,
});

const mapDispatchToProps = { removeFromCart, reduceQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
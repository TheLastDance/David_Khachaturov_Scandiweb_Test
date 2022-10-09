import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduceQuantity, removeFromCart } from '../store/mainSlice';
import { ReactComponent as SlideLeft } from '../svg_folder/slide_left.svg';
import { ReactComponent as SlideRight } from '../svg_folder/slide_right.svg';


class ItemsInCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1),
            slide: 0,
            indexItem: '',
            offsetArr: new Array(this.props.cartList.length).fill(0)
        };
    }

    //slider functions
    sliderLeft = (item, index) => {
        let offset = 210;
        let max = item.gallery.length - 1;
        //console.log(this.state.offsetArr[index]);

        if (this.state.offsetArr[index] > -(max * offset)) {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? item2 - offset : item2) }));
        } else {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? 0 : item2) }));
        }
    }

    sliderRight = (item, index) => {
        let offset = 210;
        let max = item.gallery.length - 1;
        //console.log(this.state.offsetArr[index]);

        if (this.state.offsetArr[index] < 0) {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? item2 + offset : item2) }));
        } else {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? -(max * offset) : item2) }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cartList !== this.props.cartList) {
            if (this.props.cartList.length !== this.state.offsetArr.length) {
                this.setState(({ offsetArr: [...this.state.offsetArr].filter((item2, index2) => index2 !== this.props.deletedIndex) }));
            }
        }
    }



    render() {
        console.log(this.props.deletedIndex, this.state.offsetArr)
        return (
            <div className='for_scroll'>
                {this.props.cartList.map((item, index) => <div key={`${item.id}-${JSON.stringify(item.selectedAttributes)}`} className='cart_overlay_item'>
                    {/* In key I needed to write the value that always would be the same and also unique, to turn off transition of elements, when user will delete item from cart.
                    So I coudn't use index value for that, because when user deletes item from cart index will be changed. And React will think that it's a new element, and will 
                    re-render it. Stringify is good option there, because, if selected attributes are the same that kind of products will stack in cart. So there it's 100% unique. */}
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
                        <div className='photo_slider'>
                            <div id={`slider-${index}`} className='photo_slider_2' style={{ transform: `translateX(${this.state.offsetArr[index]}px)` }}>
                                {item.gallery.map((item2, index2) => <img key={index2} src={item2} alt={item.name} />)}
                            </div>
                            {item.gallery.length > 1 && <div className='sliders'>
                                <SlideLeft onClick={() => this.sliderLeft(item, index)} />
                                <SlideRight onClick={() => this.sliderRight(item, index)} />
                            </div>}
                        </div>
                    </div>
                </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency,
    cartList: state.redux.cartList,
    deletedIndex: state.redux.deleted,
});

const mapDispatchToProps = { removeFromCart, reduceQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(ItemsInCart);
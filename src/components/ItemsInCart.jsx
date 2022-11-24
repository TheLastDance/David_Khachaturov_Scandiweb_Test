import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduceQuantity, removeFromCart } from '../store/mainSlice';
import { ReactComponent as SlideLeft } from '../svg_folder/slide_left.svg';
import { ReactComponent as SlideRight } from '../svg_folder/slide_right.svg';


//this component will render products in cart page and in cart overlay, some differences between the two will be in scss.
class ItemsInCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            offsetArr: new Array(this.props.cartList.length).fill(0) //state with slider offsets for each product in cart
        };
    }

    //slider functions
    sliderLeft = (item, index) => {
        let offset = 210; //offset percentage
        let max = item.gallery.length - 1;

        if (this.state.offsetArr[index] > -(max * offset)) {//checks if the last photo in slider was reached
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? item2 - offset : item2) }));
            //here we will define index of clicked item and match it with the same index in our offset state, then we just subtract offset percentage from the state and use it in jsx.
            document.getElementById(`${index}`).classList.remove('animationLeft');
            document.getElementById(`${index}`).classList.remove('animationRight');
            //just toggling some classes to imitate carousel slider
        } else {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? 0 : item2) }));
            //here we will change our offset to zero, when we will click from the last photo slide
            document.getElementById(`${index}`).classList.remove('animationRight');
            document.getElementById(`${index}`).classList.add('animationLeft');
            //just toggling some classes to imitate carousel slider
        }
    }

    sliderRight = (item, index) => {
        let offset = 210;
        let max = item.gallery.length - 1;

        if (this.state.offsetArr[index] < 0) {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? item2 + offset : item2) }));
            //the same like in sliderLeft function, just sum here
            document.getElementById(`${index}`).classList.remove('animationRight');
            document.getElementById(`${index}`).classList.remove('animationLeft');
        } else {
            this.setState(({ offsetArr: [...this.state.offsetArr].map((item2, index2) => index2 === index ? -(max * offset) : item2) }));
            document.getElementById(`${index}`).style.setProperty('--first', -((max * offset) + 210) + "px");
            document.getElementById(`${index}`).style.setProperty('--second', -(max * offset) + "px");
            //here I need to change values of the css variables to imitate carousel.
            document.getElementById(`${index}`).classList.remove('animationLeft');
            document.getElementById(`${index}`).classList.add('animationRight');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cartList !== this.props.cartList) {
            if (this.props.cartList.length !== this.state.offsetArr.length) {
                this.setState(({ offsetArr: [...this.state.offsetArr].filter((item2, index2) => index2 !== this.props.deletedIndex) }));
            }
        }
    }
    // here I use this function to define if my cart array from redux was changed, and if it was, I will check length of the arrays, if they aren't same, it means that we removed
    // some unique(not stacked) items from the cart, so we need to delete those items indexes from our state array, to avoid bugs with offsets of the different sliders and so on.


    render() {
        return (
            <div className='for_scroll'>
                {this.props.cartList.map((item, index) => <div key={`${item.id}-${JSON.stringify(item.selectedAttributes)}`} className='cart_overlay_item'>
                    {/* In key I needed to write the value that always would be the same and also unique, to turn off transition of elements, when user will delete item from cart.
                    So I couldn't use index value for that, because when user deletes item from cart index will be changed. And React will think that it's a new element, and will 
                    re-render it. Stringify is good option there, because, if selected attributes are the same that kind of products will stack in cart. So there it's 100% unique. */}
                    <div className='cart_overlay_item_info'>
                        <p className='product_info_brand'>{item.brand}</p>
                        <Link to={`/products/${item.id}`} className='product_info_name'>{item.name}</Link>
                        {/* maybe will change 80 line */}
                        <p className='product_info_price'>{this.props.currencySymbol}{item.itemPrice.toFixed(2)}</p> {/*using toFixed here to show pennies after dot like in figma's design*/}
                        <div className='product_info_attributes'>
                            {item.attributes.map((item2, index2) => item2.type === 'swatch' ?
                                <div className='swatch' key={index2}>
                                    <p>{`${item2.name}:`}</p>
                                    <div>{item2.items.map((item3, index3) => <div
                                        className={item.attributes[index2].items[index3].id === item.selectedAttributes[index2].id ? 'swatch_2 swatch_2_selected' : 'swatch_2'}
                                        title={item3.displayValue}
                                        key={index3}>
                                        <div style={{ background: item3.value }}></div>
                                        {/* there should be style prop, because we get color from database */}
                                    </div>)}
                                        {/* here I check attributes id's with the same indexs in attributes, and selecetedAttributes, 
                                        to show the user which attributes he chosed and render style according on it, if id's are same it means that we found users selected attribute and so on. */}
                                    </div>
                                </div> :
                                <div className='text' key={index2}>
                                    <p>{`${item2.name}:`}</p>
                                    <div>{item2.items.map((item3, index3) => <div
                                        className={item.attributes[index2].items[index3].id === item.selectedAttributes[index2].id ? 'text_2 text_2_selected' : 'text_2'}
                                        title={item3.displayValue}
                                        key={index3}>
                                        {item3.value}
                                    </div>)}
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
                        <div className='cart_photo'> {/*dispay none scss in cart_page*/}
                            <img src={item.gallery[0]} alt={item.name} />
                        </div>
                        <div className='photo_slider'> {/*display none scss in overlay*/}
                            <div id={index} className='photo_slider_2' style={{ transform: `translateX(${this.state.offsetArr[index]}px)` }}>
                                {/*here I use my offset state, depending on index. I also should use style prop here, because it won't be static*/}
                                {item.gallery.map((item2, index2) => <span key={index2}><img src={item2} alt={item.name} /></span>)}
                            </div>
                            {item.gallery.length > 1 && <div className='sliders'>
                                <SlideLeft onClick={() => this.sliderLeft(item, index)} />
                                <SlideRight onClick={() => this.sliderRight(item, index)} />
                            </div>}
                            {/* render slider arrows only if we have more than one photo in gallery */}
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
import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { PRODUCT } from '../server/queries';
import { connect } from 'react-redux';
import { addToCartFromDetails } from '../store/mainSlice';
import { Interweave } from 'interweave';

//This part of code will make page for PDP
class ProductsDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mainPhoto: '', // state for big photo of product
            attr: [], // there will be array of selected products attributes (their index)
        };
    }

    render() {
        return (
            <Query query={PRODUCT} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const product = [data.product]; // I could use there data without array, because I will have here only one product which was requested, but I decided
                    //to put the data inside array just to leave my code as it was and avoid some unnecessary bugs.

                    return <div className='product'>
                        {product.map((item, index) => <div onLoad={() => this.setState({ attr: new Array(item.attributes.length).fill(0) })} key={index} className='product_2'>
                            {/* in onLoad function I will create new array with length depending on products attributes quantity, and fill with zeros(because it will be index), I did it 
                            to select first values of attributes by default, it will avoid moment when user will not select all necessary attributes.*/}
                            <div className='all_photos'>
                                {item.gallery.map((item2, index2) => <img key={index2} src={item2} alt={item.name} onMouseOver={() => this.setState({ mainPhoto: item2 })} />)}
                            </div>
                            <div className='main_photo'>
                                <img src={this.state.mainPhoto === '' ? item.gallery[0] : this.state.mainPhoto} alt={item.name} />
                            </div>
                            <div className='product_info'>
                                <p className='product_info_brand'>{item.brand}</p>
                                <p className='product_info_name'>{item.name}</p>
                                <div className='product_info_attributes'>
                                    {!item.inStock ? null :
                                        item.attributes.map((item2, index2) => item2.type === 'swatch' ?
                                            <div className='swatch' key={index2}>
                                                <p>{`${item2.name}:`}</p>
                                                <div>{item2.items.map((item3, index3) => <div
                                                    onClick={() => this.setState({ attr: [...this.state.attr].map((item4, index4) => index4 === index2 ? index3 : item4) })}
                                                    className={index3 === this.state.attr[index2] ? 'swatch_2 swatch_2_selected' : 'swatch_2'}
                                                    title={item3.displayValue}
                                                    key={index3}>
                                                    <div style={{ background: item3.value }}></div> </div>)}
                                                </div>
                                                {/* It's not in figma's design, but it's necessary to add grey border around colors, because you have option to select white color and it's the same with our body color, so user won't see it */}
                                            </div> :
                                            <div className='text' key={index2}>
                                                <p>{`${item2.name}:`}</p>
                                                <div>{item2.items.map((item3, index3) => <div
                                                    onClick={() => this.setState({ attr: [...this.state.attr].map((item4, index4) => index4 === index2 ? index3 : item4) })}
                                                    className={index3 === this.state.attr[index2] ? 'text_2 text_2_selected' : 'text_2'}
                                                    title={item3.displayValue}
                                                    key={index3}>
                                                    {item3.value}
                                                </div>)}
                                                    {/* here I render styles according on selected attributes, so if I clicked on attribute it will change style also */}
                                                </div>
                                            </div>
                                        )}
                                </div>
                                {/* here I will check if product is in stock, and if it is will render attributes. Then I will check type of attribute, and last step is rendering
                                    clickable elements to choose attribute which we need (by default chosen attribute is first one). onClick I use function which will change my 
                                    array attribute state according on index of clicked attribute type(index2 here, so if I clicked at first attribute type - size for example, 
                                    it will change value of first element(index 0) in the state array to the index of selected attribute, then I will modify that state array
                                    in redux, to push more understandable selected attributes values to the cart and not just indexes)*/}
                                <p className='product_info_price'>PRICE:</p>
                                <p className='product_info_amount'>{this.props.currencySymbol}{item.prices.filter(item => item.currency.symbol === this.props.currencySymbol)[0].amount.toFixed(2)}</p>
                                {item.inStock && <button className='product_info_button' onClick={() => this.props.addToCartFromDetails({ item, attr: this.state.attr })}>ADD TO CART</button>}
                                {item.inStock ? <div className='product_info_description'><Interweave content={item.description} /></div> : null}
                            </div>
                        </div>)}
                    </div>
                }}
            </Query>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency,
    cartList: state.redux.cartList
});

const mapDispatchToProps = { addToCartFromDetails };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
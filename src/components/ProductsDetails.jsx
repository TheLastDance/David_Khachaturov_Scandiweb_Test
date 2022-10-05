import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { DETAILED } from '../server/queries';
import { connect } from 'react-redux';


class ProductsDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1), // current url checker
            mainPhoto: '', // state for big photo of product
            attr: [], // there will be array of selected products attributes
        };
    }

    render() {
        return (
            <Query query={DETAILED}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const product = data.category.products;

                    return <div className='product'>
                        {product.map((item, index) => this.state.url === item.id && <div onLoad={() => this.setState({ attr: new Array(item.attributes.length).fill(0) })} key={index} className='product_2'>
                            {/* in onLoad function I will create new array with length depending on products attributes quantity, and fill with zeros(because it will be index), I did it 
                            to select first values of attributes by default, it will avoid moment when user will not select all necessary attributes.*/}
                            <div className='all_photos'>
                                {item.gallery.map((item2, index2) => <img key={index2} src={item2} alt={item.id} onMouseOver={() => this.setState({ mainPhoto: item2 })} />)}
                            </div>
                            <div className='main_photo'>
                                <img src={this.state.mainPhoto === '' ? item.gallery[0] : this.state.mainPhoto} alt={item.id} />
                            </div>
                            <div className='product_info'>
                                <p className='product_info_brand'>{item.brand}</p>
                                <p className='product_info_name'>{item.name}</p>
                                <div className='product_info_attributes'>
                                    {!item.inStock ? <p style={{ color: 'red' }}>Currently unavailable</p> :
                                        item.attributes.map((item2, index2) => item2.type === 'swatch' ?
                                            <div className='swatch' key={index2}>
                                                <p>{`${item2.name}:`}</p>
                                                <div>{item2.items.map((item3, index3) => <div
                                                    onClick={() => this.setState({ attr: [...this.state.attr].map((item, index) => index === index2 ? index3 : item) })}
                                                    className='swatch_2'
                                                    title={item3.displayValue}
                                                    key={index3}
                                                    style={index3 === this.state.attr[index2] ? { border: '1px solid #5ECE7B' } : {}}> <div style={{ background: item3.value }}></div> </div>)}
                                                </div>
                                            </div> :
                                            <div className='text' key={index2}>
                                                <p>{`${item2.name}:`}</p>
                                                <div>{item2.items.map((item3, index3) => <div
                                                    onClick={() => this.setState({ attr: [...this.state.attr].map((item, index) => index === index2 ? index3 : item) })}
                                                    className='text_2'
                                                    title={item3.displayValue}
                                                    key={index3}
                                                    style={index3 === this.state.attr[index2] ? { background: '#1D1F22', color: 'white' } : { background: 'white', color: '#1D1F22' }}>{item3.value}</div>)}
                                                </div>
                                            </div>
                                        )}
                                </div>
                                {/* here I will check if product is in stock, and if it is will render attributes. Then I will check type of attribute, and last step is rendering
                                    clickable elements to choose attribute which we need (by default chosen attribute is first one). onClick I use function which will change my array attribute 
                                    state depending on index of clicked attribute type(so if I clicked on attribute in first type - size, 
                                    it will change value of the same index in the state array to the index of selected color)*/}
                                <p className='product_info_price'>PRICE:</p>
                                <p className='product_info_amount'>{this.props.currencySymbol}{item.prices.filter(item => item.currency.symbol === this.props.currencySymbol)[0].amount}</p>
                                {item.inStock && <button className='product_info_button'>ADD TO CART</button>}
                                <div className='product_info_description' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            </div>
                        </div>)}
                    </div>
                }}
            </Query>
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

export default connect(mapStateToProps)(ProductsDetails);
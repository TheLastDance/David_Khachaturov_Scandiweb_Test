import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { DETAILED } from '../server/queries';
import { connect } from 'react-redux';







class ProductsDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1),
            mainPhoto: '',
            attr: '',
        };
    }

    // chooseAttr(index2, index3) {
    //     this.setState(prev => ({ attr: prev.map((item, index) => index === index2 && index3) }))
    // }

    render() {
        console.log(this.state.mainPhoto);
        return (
            <Query query={DETAILED}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const product = data.category.products;
                    console.log(this.state.attr)

                    return <div className='product'>
                        {product.map((item, index) => this.state.url === item.id && <div onLoad={() => this.setState({ attr: new Array(item.attributes.length).fill(0) })} key={index} className='product_2'>
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
                                    {!item.inStock ? <p style={{ color: 'red' }}>Currently unavailable</p> : item.attributes.map((item2, index2) =>
                                        item2.type === 'swatch' ?
                                            <div className='swatch' key={index2}>
                                                <p>{item2.name}</p>
                                                {item2.items.map((item3, index3) => <div className='swatch_2' key={index3} style={{ background: item3.value, width: 32, height: 32 }}></div>)}
                                            </div> :
                                            <div className='text' key={index2}>
                                                <p>{item2.name}</p>
                                                {item2.items.map((item3, index3) => <div onClick={() => this.setState({ attr: [...this.state.attr].map((item, index) => index === index2 ? index3 : item) })} className='text_2' key={index3} style={index3 === this.state.attr[index2] ? { background: 'black', color: 'white' } : { background: 'white', color: 'black' }}>{item3.value}</div>)}
                                            </div>
                                    )}
                                </div>
                                <p className='product_info_price'>Price:</p>
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
import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { ITEM_LIST_QUERY, MAIN_CATEGORY } from '../server/queries';


// import { Link } from "react-router-dom";


class ItemList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1),
        };
    }

    render() {
        console.log(this.state.url)
        return (
            <div className='item_list'>
                <Query query={MAIN_CATEGORY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const category = data.categories;

                        return <div className='category_name'>
                            {this.state.url === '' && <h1>All</h1>}
                            {category.map((item, index) => this.state.url === item.name && <h1 key={index}>{item.name}</h1>)}
                        </div>
                    }}
                </Query>
                <Query query={ITEM_LIST_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const product = data.category.products;
                        console.log(product[0].gallery[0])

                        return <div className='item_cards'>
                            {product.filter(item => item.category === this.state.url).map((item, index) => <a key={index} href={item.id}>
                                <div style={{ background: `url(${item.gallery[0]})` }} className='item_card_photo'></div>
                                <div className='item_card_info'>
                                    <div className='item_card_info_name'>
                                        <p>{`${item.brand} ${item.name}`}</p>
                                    </div>
                                    <div className='item_card_info_price'>
                                        <p>{`${item.prices[0].currency.symbol}${item.prices[0].amount}`}</p>
                                    </div>
                                </div>
                            </a>)}
                        </div>
                    }}
                </Query>
            </div>
        )
    }
}

export default ItemList;
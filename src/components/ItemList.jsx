import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { ITEM_LIST_QUERY, MAIN_CATEGORY } from '../server/queries';
import ItemCard from './ItemCard';


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
                            {category.map((item, index) => this.state.url === item.name && <h1 key={index} style={{ textTransform: 'capitalize' }}>{item.name}</h1>)}
                        </div>
                    }}
                </Query>
                <Query query={ITEM_LIST_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const product = data.category.products;
                        const mainPage = this.state.url === '' || this.state.url === 'all';
                        console.log(product[0].gallery[0])

                        return <div className='item_cards'>
                            {mainPage && product.map((item, index) => <ItemCard key={index} item={item} />)}
                            {product.filter(item => item.category === this.state.url).map((item, index) => <ItemCard key={index} item={item} />)}
                        </div>
                    }}
                </Query>
            </div>
        )
    }
}

export default ItemList;
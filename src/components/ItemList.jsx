import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { DETAILED, MAIN_CATEGORY } from '../server/queries';
import ItemCard from './ItemCard';

//This part of code will make pages for PLP, according on selected category
class ItemList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname.slice(1), //current path
        };
    }

    render() {
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
                            {/* render heading of category */}
                        </div>
                    }}
                </Query>
                <Query query={DETAILED}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const product = data.category.products;
                        const mainPage = this.state.url === '' || this.state.url === 'all';

                        return <div className='item_cards'>
                            {mainPage && product.map((item, index) => <ItemCard key={index} item={item} />)} {/* render all products */}
                            {product.filter(item => item.category === this.state.url).map((item, index) => <ItemCard key={index} item={item} />)}
                            {/* filter products according on selected category */}
                        </div>
                    }}
                </Query>
            </div>
        )
    }
}

export default ItemList;
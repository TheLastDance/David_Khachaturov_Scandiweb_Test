import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { CATEGORY } from '../server/queries';
import ItemCard from './ItemCard';



//This part of code will make pages for PLP, according on selected category
class ItemList extends PureComponent {

    render() {
        //const exp = this.props.match.params.name || ""; // this const could be used in query variable if we want to render all category also at the first page of project.
        // but because it supposed to be hardcode I selected redirect option in react-router-dom.
        return (
            <div className='item_list'>
                <Query query={CATEGORY} variables={{ input: { title: this.props.match.params.name } }}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const category = data.category;

                        return <>
                            <div className='category_name'>
                                <h1>{category.name}</h1>
                                {/* render heading of category */}
                            </div>
                            <div className='item_cards'>
                                {category.products.map((item, index) => <ItemCard key={index} item={item} />)}
                            </div>
                        </>
                    }}
                </Query>
            </div>
        )
    }
}

export default ItemList;
import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { MAIN_CATEGORY } from '../server/queries';
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from '../svg_folder/homeLogo_svg.svg';
import { ReactComponent as EmptyCart } from '../svg_folder/EmptyCart.svg';


class Navbar extends PureComponent {


    render() {
        return (
            <nav id='navbar' className='navbar'>
                <Query query={MAIN_CATEGORY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);

                        const category = data.categories;

                        return <div className='navbar_2'>
                            <div className='nav_links'>{category.map((item, index) => <Link key={index} to={`/${item.name}`}>{item.name.toUpperCase()}</Link>)}</div>
                            <div className='homeLogo'><Link to={`/`}><HomeLogo /></Link></div>
                            <div className='Currency_CartLogo'>
                                <div><EmptyCart /></div>
                            </div>
                        </div>
                    }}
                </Query>

            </nav>
        )
    }
}

export default Navbar;
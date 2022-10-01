import { PureComponent } from 'react';
import { Query } from "@apollo/client/react/components";
import { MAIN_CATEGORY } from '../server/queries';
import { Link } from "react-router-dom";
import { ReactComponent as HomeLogo } from '../svg_folder/homeLogo_svg.svg';
import { ReactComponent as EmptyCart } from '../svg_folder/EmptyCart.svg';
import SelectCurrency from './selectCurrency.jsx'



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
                            <div className='nav_links'>{category.map((item, index) => <a key={index} href={`/${item.name}`}>{item.name.toUpperCase()}</a>)}</div>
                            <div className='homeLogo'><a href={`/`}><HomeLogo /></a></div>
                            <div className='Currency_CartLogo'>
                                <SelectCurrency />
                                <div className='cart'><EmptyCart /></div>
                            </div>
                        </div>
                    }}
                </Query>
            </nav>
        )
    }
}

export default Navbar;

//console.log(document.getElementById('currency').options[0].text)
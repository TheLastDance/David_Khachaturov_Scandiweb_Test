import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { CURRENCY } from '../server/queries';
import React from 'react';

class SelectCurrency extends PureComponent {
    render() {
        return (
            <Query query={CURRENCY}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const currency = data.currencies;

                    return <div ref={this.props.box} className='Currency'>
                        <div className='Currency_2'>
                            <div className='select_currency' onClick={() => this.props.toggling()}>
                                <p>{this.props.currencySymbol}</p>
                                {!this.props.toggleCurrency ? <svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 0.5L4 3.5L7 0.5" stroke="black" />
                                </svg> : <svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 3.5L4 0.5L7 3.5" stroke="black" />
                                </svg> // toggling icons
                                }
                            </div>
                        </div>
                        <div className='drop_down_currencies' style={!this.props.toggleCurrency ? { display: 'none' } : { display: 'block' }}>
                            {currency.map((item, index) => <div className='currencies_list' key={index} onClick={() => this.props.changeCurrency(item.symbol)}> <p>{item.symbol} {item.label}</p> </div>)}
                        </div>
                    </div>
                }
                }
            </Query >
        )
    }
}


export default SelectCurrency;
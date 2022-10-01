import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CURRENCY } from '../server/queries';
import { changeCurrency } from '../store/mainSlice';
import { ReactComponent as DropDown } from '../svg_folder/drop_down.svg';
import { ReactComponent as DropUp } from '../svg_folder/drop_up.svg';
import React from 'react';



class SelectCurrency extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggleCurrency: false, //сделать в редуксе
        };
    }

    changeCurrency = (symbol) => {
        this.props.changeCurrency(symbol);
        this.setState(prev => ({
            toggleCurrency: !prev.toggleCurrency
        }));
    }

    render() {
        return (
            <Query query={CURRENCY}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const currency = data.currencies;
                    console.log(this.props.currencySymbol)
                    console.log(this.state.toggleCurrency)

                    return <div className='Currency'>
                        <div className='Currency_2'>
                            <div className='select_currency' onClick={() => this.setState(prev => ({ toggleCurrency: !prev.toggleCurrency }))}>
                                <p>{this.props.currencySymbol}</p>
                                {!this.state.toggleCurrency ? <DropDown /> : <DropUp />}
                            </div>
                        </div>
                        <div className='drop_down_currencies' style={!this.state.toggleCurrency ? { display: 'none' } : { display: 'block' }}>
                            {currency.map((item, index) => <div className='currencies_list' key={index} onClick={() => this.changeCurrency(item.symbol)}> <p>{item.symbol} {item.label}</p> </div>)}
                        </div>
                    </div>
                }
                }
            </Query >
        )
    }
}

const mapStateToProps = (state) => ({
    currencySymbol: state.redux.currency
});

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
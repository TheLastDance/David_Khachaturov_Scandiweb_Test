import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CURRENCY } from '../server/queries';
import { changeCurrency } from '../store/mainSlice';
import React from 'react';



class SelectCurrency extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggleCurrency: false,
        };
        this.box = React.createRef();
    }

    changeCurrency = (symbol) => {
        this.props.changeCurrency(symbol);
        this.setState(prev => ({
            toggleCurrency: !prev.toggleCurrency
        }));
    }//this function will change currency and prices of items depending on chosen currency symbol. Currency symbol state from redux will be saved in localstorage 

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }
    handleOutsideClick = (event) => {
        if (this.box && !this.box.current.contains(event.target) && this.state.toggleCurrency) {
            this.setState({ toggleCurrency: false });
        }
    } // this function with ref will detect click outside of our box.(currency switcher)

    render() {
        return (
            <Query query={CURRENCY}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);

                    const currency = data.currencies;

                    return <div ref={this.box} className='Currency'>
                        <div className='Currency_2'>
                            <div className='select_currency' onClick={() => this.setState(prev => ({ toggleCurrency: !prev.toggleCurrency }))}>
                                <p>{this.props.currencySymbol}</p>
                                {!this.state.toggleCurrency ? <svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 0.5L4 3.5L7 0.5" stroke="black" />
                                </svg> : <svg viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 3.5L4 0.5L7 3.5" stroke="black" />
                                </svg> // toggling icons
                                }
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
}); // importing state from redux

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
import React from 'react';


class BetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '0' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log('Amount to bet: ' + this.state.value);
        console.log('Account send from: ' + this.props.account);
        const account = this.props.account;
        const val = this.state.value;
        const contract = this.props.contract;
        const outcome = this.props.outcome;
        console.log(Number(0), String(outcome), Number(val));
        contract.methods.betAmount(Number(0), String(outcome), Number(val)).send({ from: account }).then(
            result => {
                console.log(result);
                this.props.updateValue();
            },
            error => {
                console.log(error);
            }
        );
        event.preventDefault();

    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Bet amount:
            <input className="form-control form-control-lg" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input className="btn btn-primary mb-2" type="submit" value="Bet" />
            </form>
            </div>
            
        );
    }
}

export default BetForm
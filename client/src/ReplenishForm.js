import React from 'react';


class ReplenishForm extends React.Component {
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
        console.log('Amount to replenish: ' + this.state.value);
        console.log('Account send from: ' + this.props.account);
        const account = this.props.account;
        const val = this.state.value;
        const contract = this.props.contract;
        contract.methods.set(Number(val)).send({ from: account }).then(
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
                    Replenish account balance:
            <input className="form-control form-control-lg" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input className="btn btn-primary mb-2" type="submit" value="Replenish" />
            </form>
            </div>
            
        );
    }
}

export default ReplenishForm
import React from 'react';


class FinishForm extends React.Component {
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
        const account = this.props.account;
        const val = this.state.value;
        const contract = this.props.contract;
        contract.methods.finishBet(Number(0), String(val)).send({ from: account }).then(
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
                    Type outcome an outcome and click Finish:
            <input className="form-control form-control-lg" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input className="btn btn-primary mb-2" type="submit" value="Finish" />
            </form>
            </div>
            
        );
    }
}

export default FinishForm
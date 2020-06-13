import React from 'react';
import { Button } from 'react-bootstrap';


class BetButton extends React.Component {
    handleClick() {
        console.log('Bet from account:', this.props.account);
        console.log('Value to bet:', this.props.value);
    }

    render() {
        // Такой синтаксис гарантирует, что `this` привязан к handleClick.
        return (
            <Button className="primary-btn" onClick={() => this.handleClick()}>
                Bet
            </Button>
        );
    }
}

export default BetButton
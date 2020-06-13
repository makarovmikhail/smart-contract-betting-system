import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import BetTable from "./BetTable.js";
import BetForm from "./BetForm.js";
import FinishForm from "./FinishForm.js";
import ReplenishForm from "./ReplenishForm.js";

import { Dropdown, DropdownButton } from "react-bootstrap";



import "./App.css";

class App extends Component {
  state = { storageValue: 0, betRequests: '[{"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7"}]', web3: null, accounts: null, contract: null, outcome: "Choose outcome", betValue: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.updateBetRequests);
      this.updateValue();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.log(error);
    }
  };

  updateValue = async () => {
    const { accounts, contract } = this.state;

    try {
      const response = await contract.methods.get().call({ from: accounts[0] });
      console.log(`Storage value for ${accounts[0]} is ${response}`);
      // Update state with the result.
      this.setState({ storageValue: response });
    } catch (e) {
      this.setState({ storageValue: "some error has happened" });
    }
  };

  updateBetRequests = async () => {
    const { accounts, contract } = this.state;

    try {

      //const response = await contract.methods.getBetRequestName().call({ from: accounts[0] });
      const index = await contract.methods.getBetRequestCount().call();
      console.log(index);

      let result = [];
      for (let i = 0; i < index; i++) {
        const item = await contract.methods.getBetRequest(i).call();
        console.log(item);
        result.push(item);
      }

      // Update state with the result.
      this.setState({ betRequests: JSON.stringify(result) });

      console.log(result);
    } catch (e) {
      alert(e);
      this.setState({ betRequests: "some error has happened" });
    }

  };

  updateOutcome = async (event) => {
    console.log(event);
    this.setState({outcome: event});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Smart-contract betting system</h1>
        <p hidden>Your Truffle Box is installed and ready.</p>
        <h2 hidden>Smart Contract Example</h2>
        <p>
          Choose event and outcome, set amount to bet and click Bet!
        </p>
        <p hidden>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>Welcome to Ethereum betting system, {this.state.accounts[0]}</div>
        <div>Your balance in Betting System Tokens (BST): {this.state.storageValue}</div>

        <ReplenishForm account={this.state.accounts[0]} contract={this.state.contract} updateValue={this.updateValue} />
        <div className="justify-content-md-center">
          <BetTable betRequests={this.state.betRequests} />
        </div>
        <div>
          <DropdownButton id="dropdown-item-button" title={this.state.outcome}>
            <Dropdown.Item as="button" eventKey="Win" onSelect={this.updateOutcome}>Win</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="Draw" onSelect={this.updateOutcome}>Draw</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="Lose" onSelect={this.updateOutcome}>Lose</Dropdown.Item>
          </DropdownButton>
        </div>
        
        <BetForm account={this.state.accounts[0]} contract={this.state.contract} outcome={this.state.outcome} updateValue={this.updateValue} />
        <FinishForm account={this.state.accounts[0]} contract={this.state.contract} outcome={this.state.outcome} updateValue={this.updateValue} />
      </div>
    );
  }
}

export default App;

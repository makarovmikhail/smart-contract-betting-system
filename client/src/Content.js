import React from 'react'
import Table from './Table'
import Form from './Form'

class Content extends React.Component {
  render() {
    return (
      <div>
        <Table events={this.props.events} />
        <hr/>
        { !this.props.isActive ?
          <Form events={this.props.events} bet={this.props.bet} />
          : null
        }
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content
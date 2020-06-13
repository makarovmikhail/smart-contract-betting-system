import React from 'react'

class BetTable extends React.Component {
  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start time</th>
            <th>Finish time</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Lose</th>
          </tr>
        </thead>
        <tbody >
          {JSON.parse(this.props.betRequests).map((d) => {
            return(
              <tr
                key={d[0]}>
                <th>{d[0]}</th>
                <td>{d[1]}</td>
                <td>{String(new Date(Number(d[2])))}</td>
                <td>{String(new Date(Number(d[3])))}</td>
                <td>{d[4]}</td>
                <td>{d[5]}</td>
                <td>{d[6]}</td>                
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default BetTable
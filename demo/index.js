import React from 'react';
import ReactDOM from 'react-dom';
import FireAct from '../src/';


class Countries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let countries = Object.keys(this.props.data).map((country) => {
      let countryData = this.props.data[country];
      return <li key={country}>
        <h1>{country.toUpperCase()}</h1>
        <p>En: {countryData}</p>
      </li>;
    });

    return (
      <ul>{countries}</ul>
    );
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  dataChangeHandler(data) {
    this.setState({data: data});
  }

  updateAF() {
    this.setState({
      data: {'yo': 'mama'}
    })
  }

  render() {
    let countries = (this.state.data) ? <Countries data={this.state.data}/> : null;
    return (
      <div>
        <button onClick={this.updateAF.bind(this)} >Update</button>
        <FireAct
          url="https://fireact.firebaseio.com/push"  bindTo={this.state.data} onDataChange={this.dataChangeHandler.bind(this)} />
        {countries}
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
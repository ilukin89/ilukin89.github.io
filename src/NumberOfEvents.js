import React, { Component } from 'react';

class NumberOfEvents extends Component {
  
  state = {
    numberOfEvents: 10,
    infoText: ''
  }
  
  handleInputChanged = (event) => {
    const number = event.target.value;
    if (number <= 0 || number > 10) {
      this.setState ({
        infoText: 'Choose number between 1 and 10'
      });
    } else {
      this.setState({ 
        numberOfEvents: number,
        infoText: ''
      });
    
    }
  };

  render() {
    return (
      <div>
        <p>Change number of shown events between 1-10</p>
        
        <input type="number" value={this.state.numberOfEvents} className="newValue" onChange={(e) => this.handleInputChanged(e)} />
        <alert text={this.state.infoText} />
      </div>
    );
  }
}

export default NumberOfEvents;
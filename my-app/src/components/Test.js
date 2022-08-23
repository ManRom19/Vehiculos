import React from 'react';

export class Test extends React.Component {

  render() {
  	const {actions: {fetchTestInfo}} = this.props
    return (
      <div>
        <button onClick={() => fetchTestInfo()} >Test Button</button>
      </div>
    );
  }
}

export default Test
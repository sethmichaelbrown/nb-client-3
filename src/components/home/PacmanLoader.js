import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';


class PacmanLoading extends Component {
  state = {
    loading: true
  }

  render() {
    return (
      <div className='sweet-loading'>
        <PacmanLoader
          sizeUnit={"px"}
          size={this.props.size}
          color={'#5C908F'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default PacmanLoading
import React, { Component } from 'react';
import { InputMonetary as FAInputMonetary } from 'react-bootstrap-front';
import {
  Swap as SwapIcon,
  LockOn as LockOnIcon,
  LockOff as LockOffIcon,
} from '../icons';

export default class InputMonetary extends Component {
  render() {
    return (
      <FAInputMonetary
        {...this.props}
        swapIcon={<SwapIcon className="text-secondary" size={0.9} />}
        lockOffIcon=<LockOffIcon className="text-primary" size={0.9} />
        lockOnIcon=<LockOnIcon className="text-secondary" size={0.9} />
      />
    );
  }
}

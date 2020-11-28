import React, { Component } from 'react';
import { InputDate as RBFInputDate } from 'react-bootstrap-front';
import {
  Calendar as CalendarIcon,
  DelOne as DelOneIcon,
  LockOn as LockOnIcon,
  LockOff as LockOffIcon,
} from '../icons';

export default class InputDate extends Component {
  render() {
    return (
      <RBFInputDate
        {...this.props}
        calIcon={<CalendarIcon className="text-secondary" size={0.9} />}
        delIcon={<DelOneIcon className="text-warning" size={0.9} />}
        lockOffIcon=<LockOffIcon className="text-primary" size={0.9} />
        lockOnIcon=<LockOnIcon className="text-secondary" size={0.9} />
      />
    );
  }
}

import React, { Component } from 'react';
import { Icon } from './';
import { mdiHeartMultiple as myMdi } from '@mdi/js';

export default class Cause extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myMdi} {...this.props} />;
  }
}

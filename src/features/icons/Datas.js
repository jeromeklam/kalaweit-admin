import React, { Component } from 'react';
import { Icon } from './';
import { mdiFolderSettingsOutline as myIcon } from '@mdi/js';

export default class Datas extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} size={1} {...this.props} />;
  }
}

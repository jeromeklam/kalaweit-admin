import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { ResponsiveForm, ResponsiveModal } from 'react-bootstrap-front';

class ResponsiveModalOrForm extends Component {
  static propTypes = {};

  render() {
    if (this.props.modal) {
      const buttons = [
        {
          name: this.props.intl.formatMessage({
            id: 'app.features.ui.responsiveModalOrForm.save',
            defaultMessage: 'Save',
          }),
          function: this.props.onSubmit,
          theme: 'primary',
          icon: 'valid',
        },
        {
          name: this.props.intl.formatMessage({
            id: 'app.features.ui.responsiveModalOrForm.cancel',
          }),
          defaultMessage: 'Cancel',
          function: this.props.onClose,
          theme: 'secondary',
          icon: 'close',
        },
      ];
      return (
        <ResponsiveModal
          {...this.props}
          size={this.props.size || 'fullscreen'}
          show={true}
          buttons={buttons}
        />
      );
    }
    return <ResponsiveForm {...this.props} />;
  }
}

export default injectIntl(ResponsiveModalOrForm);

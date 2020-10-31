import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel, modelsToSelect } from '../../common';
import { CenteredLoading3Dots, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.emailId || this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.email.loadOneItem;
      this.setState({ item: item });
    });
  }

  onCancel(event) {
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeFW_Email', this.state.id);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeFW_Email', result);
        this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.lang.items, 'id', 'lang_name');
    return (
      <div className="email-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                langs={options}
                errors={this.props.email.updateOneError}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify)));

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { setModelValue, propagateModel } from '../../common';
import { modifySuccess, showErrors } from '../ui';
import { IdentificationAvatar, IdentificationTab, PasswordTab, SettingsTab } from './';

export class SimpleForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.auth.user !== state.user) {
      return { user: props.auth.user, localUser: props.auth.user };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.auth.user,
      localUser: props.auth.user,
      activeTab: 1,
      menuAvatar: false,
      refAvatar: React.createRef(),
    };
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onSignout = this.onSignout.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onChangeUser(event) {
    const { localUser } = this.state;
    setModelValue(localUser, event.target.name, event.target.value);
    this.setState({ localUser: localUser });
  }

  onSubmitUser(evt) {
    if (evt) {
      evt.preventDefault();
    }
    let obj = getJsonApi(this.state.user, 'FreeSSO_User', this.state.localUser.id);
    this.props.actions
      .updateOne(this.state.localUser.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeSSO_User', result);
        this.props.onClose && this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  onChangeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  onSignout() {
    this.props.actions.signOut().then(result => {
      this.props.actions.push('/');
    });
  }

  onClose() {
    this.onChangeActiveTab(1);
    this.props.onClose && this.props.onClose();
  }

  render() {
    const { localUser, activeTab } = this.state;
    if (this.props.auth.authenticated && this.props.home.loadAllFinish) {
      return (
        <div className="row pt-2">
          <div className="col-sm-w10 text-center">
            <IdentificationAvatar authUser={localUser} onChangeUser={(event) => this.onChangeUser(event)}/>
          </div>
          <div className="col-xs-w20">
            <div className="tab-content pl-5 pr-5" id="v-pills-tabContent">
              {activeTab === 1 && (
                <IdentificationTab
                  user={localUser}
                  lang={this.props.lang}
                  style={this.props.style}
                  onChangeUser={this.onChangeUser}
                  onSubmitUser={this.onSubmitUser}
                />
              )}
              {activeTab === 2 && (
                <SettingsTab onChangeTab={() => this.onChangeActiveTab(1)} onClose={this.props.onClose}/>
              )}
              {activeTab === 3 && (
                <PasswordTab onChangeTab={() => this.onChangeActiveTab(1)} onClose={this.props.onClose}/>
              )}
            </div>
          </div>
          <div className="col-xs-w6" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 1 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(1);
              }}
            >
              <FormattedMessage id="app.features.auth.form.tabIdentity" defaultMessage="Identity" />
            </button>
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 3 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(3);
              }}
            >
              <FormattedMessage
                id="app.features.auth.form.tabPassword"
                defaultMessage="Change password"
              />
            </button>
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 2 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(2);
              }}
            >
              <FormattedMessage id="app.features.auth.form.tabSettings" defaultMessage="Settings" />
            </button>
            <button
              className='btn btn-block text-secondary'
              onClick={this.onSignout}
            >
              <FormattedMessage id="app.features.auth.form.signout" defaultMessage="Sign out" />
            </button>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    home: state.home,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel, push }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SimpleForm));

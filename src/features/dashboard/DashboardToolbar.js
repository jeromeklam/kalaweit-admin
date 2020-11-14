import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJsonApi } from 'jsonapi-front';
import { Highlight } from 'react-bootstrap-front';
import * as actions from './redux/actions';
import { updateConfig } from '../auth/redux/actions';
import {
  GetOne as GetOneIcon,
  Save as SaveIcon,
  Reload as ReloadIcon,
  Stop as StopIcon,
  DashboardReset as ResetIcon,
} from '../icons';
import { modifySuccess, modifyError } from '../ui';
import { getFromLS } from '../ui';

export class DashboardToolbar extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    onEdit: PropTypes.func,
    onEditStop: PropTypes.func,
  };
  static defaultProps = {
    onEdit: null,
    onEditStop: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
    this.onRefreshDashboard = this.onRefreshDashboard.bind(this);
    this.onSaveDashboard = this.onSaveDashboard.bind(this);
    this.onResetDashboard = this.onResetDashboard.bind(this);
    this.onLocalEdit = this.onLocalEdit.bind(this);
  }

  onRefreshDashboard(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.actions.loadMore();
  }

  onSaveDashboard(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const originalLayouts = getFromLS('layouts') || {};
    const datas = {
      type: 'FreeSSO_ConfigRequest',
      config: JSON.stringify(originalLayouts),
      config_type: 'cache',
    };
    let obj = getJsonApi(datas);
    this.props.actions
      .updateConfig(obj)
      .then(result => {
        modifySuccess();
      })
      .catch(errors => {
        modifyError();
      });
  }

  onResetDashboard() {
    this.props.onResetLayout();
  }

  onLocalEdit() {
    const { editable } = this.state;
    if (editable) {
      this.setState({ editable: false });
      this.props.onEditStop();
    } else {
      this.setState({ editable: true });
      this.props.onEdit();
    }
  }

  render() {
    return (
            <div className="dashboard-dashboard-toolbar">
        <div className="row row-short">
          <div className="col-xs-w18 text-left">
            <div className="nav justify-content-left">
              <div className="nav-item">
                <Highlight toggler={true} className="text-light" theme="DASHBOARD" />
              </div>
            </div>
          </div>
          <div className="col-xs-w18 text-right">
            <div className="nav justify-content-end">
              <div className="nav-item">
                {!this.state.editable && (
                  <button
                    className="btn btn-secondary text-light"
                    title="Recharger votre présentation personnalisée"
                    onClick={this.onRefreshDashboard}
                  >
                    <ReloadIcon />
                    <Highlight position="bottom" theme="DASHBOARD" title="Recharger sa présentations" />
                  </button>
                )}
                {!this.state.editable && (
                  <button
                    className="btn btn-warning text-light"
                    title="Revenir à la présentation initiale"
                    onClick={this.onResetDashboard}
                  >
                    <ResetIcon />
                    <Highlight position="bottom" theme="DASHBOARD" title="Revenir à la présentation par défaut" />
                  </button>
                )}
                {this.state.editable && (
                  <button
                    className="btn btn-primary text-light"
                    title="Enregistrer cette présentation personnalisée"
                    onClick={this.onSaveDashboard}
                  >
                    <SaveIcon />
                    <Highlight position="bottom" theme="DASHBOARD" title="Enregistrer la présentation" />
                  </button>
                )}
                {!this.state.editable ? (
                  <button
                    className="btn btn-secondary text-light"
                    title="Modifier la disposition"
                    onClick={this.onLocalEdit}
                  >
                    <GetOneIcon />
                    <Highlight position="bottom" theme="DASHBOARD" title="Editer la présentation" />
                  </button>
                ) : (
                  <button
                    className="btn btn-warning text-light"
                    title="Stop"
                    onClick={this.onLocalEdit}
                  >
                    <StopIcon />
                    <Highlight position="bottom" theme="DASHBOARD" title="Arrêter l'édition" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, updateConfig }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardToolbar);
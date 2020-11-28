import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getJsonApi } from 'jsonapi-front';
import { Responsive, WidthProvider } from 'react-grid-layout';
import * as actions from './redux/actions';
import { updateConfig } from '../auth/redux/actions';
import { Friend as FriendIcon, Donation as DonationIcon } from '../icons';
import { DashboardCardStat, DashboardToolbar } from './';
import { getFromLS, saveToLS, modifySuccess, showErrors } from '../ui';
import { DashboardJobqueues } from '../jobqueue';

const getLayoutSize = (layouts, breakpoint, key) => {
  let size = 'sm';
  const layoutBr = layouts[breakpoint] || [];
  if (Array.isArray(layoutBr)) {
    const layout = layoutBr.find(elem => elem.i === key);
    if (layout) {
      if (layout.w < 9) {
        size = 'sm';
      } else {
        if (layout.w < 18) {
          size = 'md';
        } else {
          if (layout.w < 27) {
            size = 'lg';
          } else {
            size = 'xl';
          }
        }
      }
    }
  }
  return size;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive, { measureBeforeMount: true });

export class DashboardGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const originalLayouts = getFromLS('layouts') || {};
    this.state = {
      breakpoint: 'lg',
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      editable: false,
      savedLayouts: {},
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onResetLayout = this.onResetLayout.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onEditStart = this.onEditStart.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSaveLayout = this.onSaveLayout.bind(this);
  }

  onLayoutChange(layout, layouts) {
    this.setState({ layouts });
  }

  onRefresh(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.actions.loadMore();
  }

  onBreakpointChange(breakpoint) {
    this.setState({ breakpoint });
  }

  onResetLayout() {
    const originalLayouts = {};
    const layouts = JSON.parse(JSON.stringify(originalLayouts));
    this.setState({ layouts });
  }

  onResizeStop(param1, param2) {}

  onEditStart() {
    this.setState({ editable: true, savedLayouts: this.state.layouts });
  }

  onEditCancel() {
    this.setState({ editable: false, layouts: this.state.savedLayouts });
  }

  onSaveLayout(evt) {
    if (evt) {
      evt.preventDefault();
    }
    saveToLS('layouts', this.state.layouts);
    this.setState({ editable: false });
    const datas = {
      type: 'FreeSSO_ConfigRequest',
      config: JSON.stringify(this.state.layouts),
      config_type: 'cache',
    };
    let obj = getJsonApi(datas);
    this.props.actions
      .updateConfig(obj)
      .then(result => {
        modifySuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  render() {
    const { layouts, breakpoint } = this.state;
    if (this.props.auth.authenticated && this.props.dashboard.stats) {
      return (
        <div>
          <DashboardToolbar
            editable={this.state.editable}
            onRefresh={this.onRefresh}
            onReset={this.onResetLayout}
            onSave={this.onSaveLayout}
            onResetLayout={this.onResetLayout}
            onEditStart={this.onEditStart}
            onEditCancel={this.onEditCancel}
          />
          <ResponsiveReactGridLayout
            className="layout p-2"
            cols={{ lg: 36, md: 36, sm: 36, xs: 36, xxs: 36 }}
            rowHeight={30}
            verticalCompact={true}
            onResize={this.onResize}
            onLayoutChange={this.onLayoutChange}
            onResizeStop={this.onResizeStop}
            onBreakpointChange={this.onBreakpointChange}
            draggableHandle=".card-draggable-area"
            layouts={layouts}
            isDraggable={this.state.editable}
            isResizable={this.state.editable}
          >
            <div key="friends" data-grid={{ w: 6, h: 2, x: 14, y: 1, minW: 6, maxW: 6, minH: 2, maxH: 2 }}>
              <DashboardCardStat
                title="Amis"
                count={this.props.dashboard.stats.friends}
                icon={<FriendIcon size={2} />}
                url="/client"
                overlay={this.state.editable}
                size={getLayoutSize(layouts, breakpoint, 'friends')}
              />
            </div>
            <div
              key="donations"
              data-grid={{ w: 6, h: 2, x: 21, y: 1, minW: 6, maxW: 6, minH: 2, maxH: 2 }}
            >
              <DashboardCardStat
                title="Donations"
                count={this.props.dashboard.stats.donations}
                icon={<DonationIcon size={2} />}
                url="/donation"
                overlay={this.state.editable}
                size={getLayoutSize(layouts, breakpoint, 'donations')}
              />
            </div>
            <div
              key="jobqueues"
              data-grid={{ w: 18, h: 5, x: 0, y: 5, minW: 18, maxW: 36, minH: 5 }}
            >
              <DashboardJobqueues />
            </div>
          </ResponsiveReactGridLayout>
        </div>
      );
    }
    return null;
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
    actions: bindActionCreators({ ...actions, updateConfig }, dispatch),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardGrid));

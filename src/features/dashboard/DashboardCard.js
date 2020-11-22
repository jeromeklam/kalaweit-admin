import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class DashboardCard extends Component {
  static propTypes = {
    children: PropTypes.element,
    header: PropTypes.element,
    url: PropTypes.string,
  };
  static defaultProps = {
    children: null,
    header: null,
    url: null,
  };

  render() {
    let counter = null;
    let num = 0;
    if (this.props.count) {
      try {
        num = new Intl.NumberFormat('fr-FR').format(this.props.count);
      } catch (ex) {}
      if (this.props.unit) {
        counter = num + ' ' + this.props.unit;
      } else {
        counter = num;
      }
    }
    return (
      <div className="dashboard-stat-card">
        <div className="card">
          <div className="card-header card-header-warning card-header-icon">
            {this.props.url ? (
              <NavLink strict className="nav-link link" to={this.props.url}>
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </NavLink>
            ) : (
              <div className="nav-link link">
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </div>
            )}
            <p className="card-category">{this.props.title}</p>
            {this.props.header}
          </div>
          <div className="card-body">
            {counter && <h3 className="card-title">{counter}</h3>}
            <div className="custom-scrollbar" style={{ height: '100%', overflowX: 'hidden', overflowY: 'auto' }}>
              {this.props.children !== null && <div>{this.props.children}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

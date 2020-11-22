import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function DashboardCardStat(props) {
  let counter = null;
  let num = 0;
  if (props.count) {
    try {
      num = new Intl.NumberFormat('fr-FR').format(props.count);
    } catch (ex) {}
    if (props.unit) {
      counter = num + ' ' + props.unit;
    } else {
      counter = num;
    }
  }
  return (
    <div className="dashboard-dashboard-card-stat border border-secondary">
      <div className="row">
        <div className="col-xs-w14 text-center">
          {props.url ? (
            <NavLink strict className="nav-link link" to={props.url}>
              <div className="text-secondary">{props.icon}</div>
            </NavLink>
          ) : (
            <div className="nav-link link">
              <div className="text-secondary pt-2">{props.icon}</div>
            </div>
          )}
        </div>
        <div className="col-xs-w18">
          <div className="row">
            <div className="col-xs-w36 text-center">
              <h4 className="card-title">{counter}</h4>
            </div>
          </div>
          <div className="row">
            <div className="card-draggable-area col-xs-w36 text-center">
              <p className="card-category text-secondary">{props.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardCardStat.propTypes = {};
DashboardCardStat.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { InputText, InputSelect } from 'react-bootstrap-front';
import { langAsOptions } from '../lang';

export default function IdentificationTab(props) {
  const langOptions = langAsOptions(props.lang.items, ['en', 'fr']);
  return (
    <div className="auth-identification-tab">
      <form className="auth-simple-form" style={props.style} onSubmit={props.onSubmitUser}>
        <InputText
          label={<FormattedMessage id="app.user.firstname" defaultMessage="Firstname" />}
          name="user_first_name"
          value={props.user.user_first_name}
          labelTop
          onChange={props.onChangeUser}
        />
        <InputText
          label={<FormattedMessage id="app.user.lastname" defaultMessage="Lastname" />}
          name="user_last_name"
          value={props.user.user_last_name}
          labelTop
          onChange={props.onChangeUser}
        />
        <InputText
          label={<FormattedMessage id="app.user.email" defaultMessage="Email" />}
          name="user_last_name"
          value={props.user.user_email}
          labelTop
          onChange={props.onChangeUser}
        />
        <InputSelect
          label={<FormattedMessage id="app.user.lang" defaultMessage="Language" />}
          name="lang.id"
          value={props.user.lang.id}
          labelTop
          onChange={props.onChangeUser}
          options={langOptions}
        />
        <div className="text-right">
          <button className="btn btn-primary">
            {<FormattedMessage id="app.features.auth.form.save" defaultMessage="Save" />}
          </button>
        </div>
      </form>
    </div>
  );
}

IdentificationTab.propTypes = {
  user: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
  style: PropTypes.object,
  onChangeUser: PropTypes.func.isRequired,
  onSubmitUser: PropTypes.func.isRequired,
};

IdentificationTab.defaultProps = {
  style: null,
};
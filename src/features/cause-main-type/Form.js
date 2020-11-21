import React from 'react';
import { InputHidden, InputText, InputSelect } from 'react-bootstrap-front';
import { injectIntl } from 'react-intl';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { causeMainTypeFamily } from './';

function Form(props) {
  const modify = props.modify || false;
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="sm"
      modal={true}
      title={props.intl.formatMessage({
        id: 'app.features.causeMainType.form.title',
        defaultMessage: 'Program',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row>">
          <div className="col-xs-w36">
            <InputText
              label={props.intl.formatMessage({
                id: 'app.features.causeMainType.form.name',
                defaultMessage: 'Name',
              })}
              name="camt_name"
              required={true}
              value={values.camt_name}
              onChange={handleChange}
              error={getErrorMessage('camt_name')}
            />
          </div>
        </div>
        <div className="row>">
          <div className="col-md-w36">
            <InputSelect
              label={props.intl.formatMessage({
                id: 'app.features.causeMainType.form.family',
                defaultMessage: 'Operation',
              })}
              name="camt_family"
              id="camt_family"
              disabled={modify}
              value={values.camt_family}
              onChange={handleChange}
              options={causeMainTypeFamily}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

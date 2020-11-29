import React from 'react';
import { injectIntl } from 'react-intl';
import {
  InputHidden,
  InputSelect,
  InputText,
  InputCheckbox,
  roundMonetary,
  displayMonetary,
} from 'react-bootstrap-front';
import {
  InputDate,
  ResponsiveModalOrForm,
  InputSponsors,
  InputTextarea,
  InputMonetary,
} from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';
import { sessionAsOptions } from '../session/functions.js';
import { getStatus, calculateDonationEndTs } from './';

const afterChange = (name, item) => {
  switch (name) {
    case 'don_mnt':
      item.don_money_input = item.__inputMoney;
      item.don_money = item.__dbMoney;
      if (item.__inputMoney !== item.__dbMoney) {
        const change1 = item.__getRate(item.__currentMoney, item.__inputMoney);
        const mnt1 = roundMonetary(
          parseFloat(item.don_mnt || 0) * change1,
          'fr-FR',
          item.__inputMoney,
        );
        if (Math.abs(parseFloat(item.don_mnt_input || 0) - mnt1) > 0.01) {
          item.don_mnt_input = mnt1;
        }
        console.log('don_mnt', change1, mnt1, item);
      } else {
        item.don_mnt_input = item.don_mnt;
      }
      break;
    case 'don_mnt_input':
      item.don_money_input = item.__inputMoney;
      item.don_money = item.__dbMoney;
      if (item.__inputMoney !== item.__dbMoney) {
        const change2 = item.__getRate(item.__currentMoney, item.__dbMoney);
        const mnt2 = roundMonetary(
          parseFloat(item.don_mnt_input || 0) * change2,
          'fr-FR',
          item.__dbMoney,
        );
        if (Math.abs(parseFloat(item.don_mnt || 0) - mnt2) > 0.01) {
          item.don_mnt = mnt2;
        }
        console.log('don_mnt_input', change2, mnt2, item);
      } else {
        item.don_mnt = item.don_mnt_input;
      }
      break;
    case 'don_real_ts':
    case 'cause': {
      const endTs = calculateDonationEndTs(item);
      let update = true;
      const found = item.__locked.find(elem => elem.field === 'don_end_ts');
      if (found && found.__locked === false) {
        update = false;
      }
      if (update) {
        item.don_end_ts = endTs;
      }
      break;
    }
    default: {
      break;
    }
  }
};

function Form(props) {
  let lockEndTs = true;
  if (props.modify) {
    const endTs = calculateDonationEndTs(props.item);
    const d1 = new Date(props.item.don_end_ts);
    const d2 = new Date(endTs);
    if (d1.getTime() !== d2.getTime()) {
      lockEndTs = false;
    }
  }
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
    isLocked,
    toggleLockOn,
    toggleLockOff,
    switchMoney,
    getCurrentMoney,
  } = useForm(
    props.item,
    '1',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors,
    props.intl,
    afterChange,
    null,
    [
      { field: 'don_end_ts', locked: lockEndTs },
      { field: 'don_mnt', locked: props.modify },
      { field: 'don_mnt_input', locked: props.modify },
    ],
    props.rates,
    props.inputMoney,
    props.dbMoney,
  );
  /**
   * Render
   */
  const { intl } = props;
  const tabs = [
    {
      key: '1',
      name: 'main',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.main',
        defaultMessage: 'Donation',
      }),
      shortcut: 'P',
      icon: '',
    },
    {
      key: '2',
      name: 'sponsors',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.sponsors',
        defaultMessage: 'Sponsors',
      }),
      shortcut: 'S',
      icon: '',
    },
  ];
  const tabs2 = [
    {
      key: '3',
      name: 'certificate',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.sertificate',
        defaultMessage: 'Certificate',
      }),
      shortcut: 'C',
      icon: '',
    },
  ];
  let allTabs = tabs;
  if (values.cause.cause_type && values.cause.cause_type.caut_certificat) {
    allTabs = allTabs.concat(tabs2);
  }
  const readonlyForm = values.session && values.session.sess_status === 'CLOSED';
  return (
    <ResponsiveModalOrForm
      title={intl.formatMessage({
        id: 'app.features.donation.form.title',
        defaultMessage: 'Donation',
      })}
      className="m-5"
      size="xl"
      height="lg"
      tab={values.currentTab}
      tabs={allTabs}
      onNavTab={handleNavTab}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div>
        <div className="row">
          <div className="col-sm-w14">
            <ClientInputPicker
              label={intl.formatMessage({
                id: 'app.features.donation.form.client',
                defaultMessage: 'Member',
              })}
              labelTop={true}
              key="client"
              name="client"
              item={values.client || null}
              disabled={readonlyForm}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-w14">
            <CauseInputPicker
              label={intl.formatMessage({
                id: 'app.features.donation.form.cause',
                defaultMessage: 'Mission',
              })}
              labelTop={true}
              key="cause"
              name="cause"
              item={values.cause || null}
              disabled={readonlyForm}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-w8">
            <InputSelect
              label={intl.formatMessage({
                id: 'app.features.donation.form.session',
                defaultMessage: 'Session',
              })}
              name="session.id"
              labelTop={true}
              value={values.session ? values.session.id : null}
              addempty={false}
              onChange={handleChange}
              disabled={readonlyForm}
              options={sessionAsOptions(props.sessions)}
            />
          </div>
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-md-w10">
              <InputDate
                label={intl.formatMessage({
                  id: 'app.features.donation.form.realTs',
                  defaultMessage: 'Done on',
                })}
                labelTop={true}
                name="don_real_ts"
                id="don_real_ts"
                inputSize={36}
                value={values.don_real_ts}
                disabled={readonlyForm}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-w10">
              <InputDate
                label={intl.formatMessage({
                  id: 'app.features.donation.form.endTs',
                  defaultMessage: 'End on',
                })}
                labelTop={true}
                name="don_end_ts"
                id="don_end_ts"
                inputSize={36}
                value={values.don_end_ts}
                onChange={handleChange}
                locked={isLocked('don_end_ts')}
                disabled={readonlyForm}
                onLockOn={toggleLockOn}
                onLockOff={toggleLockOff}
              />
            </div>
            <div className="col-md-w8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.sponsorship',
                  defaultMessage: 'Sponsorship',
                })}
                name="sponsorship.id"
                labelTop={true}
                disabled={true}
                checked={values.sponsorship.id > 0}
              />
            </div>
            <div className="col-md-w8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.origin',
                  defaultMessage: 'Generated',
                })}
                name="origin.id"
                labelTop={true}
                disabled={true}
                checked={values.origin.id > 0}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-w10">
              {getCurrentMoney() === props.dbMoney ? (
                <InputMonetary
                  label={intl.formatMessage({
                    id: 'app.features.donation.form.mnt',
                    defaultMessage: 'Amount',
                  })}
                  labelTop={true}
                  name="don_mnt"
                  id="don_mnt"
                  inputMoney={getCurrentMoney()}
                  locked={isLocked('don_mnt')}
                  disabled={readonlyForm}
                  onLockOn={toggleLockOn}
                  onLockOff={toggleLockOff}
                  dbMoney={props.dbMoney}
                  value={values.don_mnt}
                  rateValue={displayMonetary(values.don_mnt_input, props.inputMoney)}
                  onChange={handleChange}
                  onMoneySwitch={props.inputMoney !== props.dbMoney ? switchMoney : null}
                />
              ) : (
                <InputMonetary
                  label={intl.formatMessage({
                    id: 'app.features.donation.form.mnt',
                    defaultMessage: 'Amount',
                  })}
                  labelTop={true}
                  name="don_mnt_input"
                  id="don_mnt_input"
                  inputMoney={getCurrentMoney()}
                  locked={isLocked('don_mnt_input')}
                  disabled={readonlyForm}
                  onLockOn={toggleLockOn}
                  onLockOff={toggleLockOff}
                  dbMoney={props.dbMoney}
                  value={values.don_mnt_input}
                  rateValue={displayMonetary(values.don_mnt, props.dbMoney)}
                  onChange={handleChange}
                  onMoneySwitch={props.inputMoney !== props.dbMoney ? switchMoney : null}
                />
              )}
            </div>
            <div className="col-sm-w10">
              <InputSelect
                label={intl.formatMessage({
                  id: 'app.features.donation.form.type',
                  defaultMessage: 'Type',
                })}
                name="payment_type.id"
                labelTop={true}
                inline
                labelSize={36}
                inputSize={36}
                value={values.payment_type.id}
                disabled={readonlyForm}
                onChange={handleChange}
                options={paymentTypeAsOptions(props.paymentTypes)}
                error={getErrorMessage('ptyp_id')}
              />
            </div>
            <div className="col-sm-w8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.displaySite',
                  defaultMessage: 'Show on site',
                })}
                name="don_display_site"
                labelTop={true}
                checked={values.don_display_site === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-w8">
              <InputSelect
                label={intl.formatMessage({
                  id: 'app.features.donation.form.status',
                  defaultMessage: 'Status',
                })}
                id="don_status"
                name="don_status"
                labelTop={true}
                value={values.don_status}
                onChange={handleChange}
                options={getStatus(intl)}
                error={getErrorMessage('don_status')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-w36">
              <InputTextarea
                label={intl.formatMessage({
                  id: 'app.features.donation.form.comment',
                  defaultMessage: 'Comments',
                })}
                name="don_comment"
                labelTop={true}
                value={values.don_comment}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row" />
          <div className="row">
            <div className="col-sm-w36">
              <InputSponsors
                label={intl.formatMessage({
                  id: 'app.features.donation.form.sponsors',
                  defaultMessage: 'Sponsors',
                })}
                id="don_sponsors"
                name="don_sponsors"
                value={values.don_sponsors}
                onChange={handleChange}
                error={getErrorMessage('don_sponsors')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '3' && (
        <div>
          <div className="row">
            <div className="col-sm-w18">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.certificate.form.fullname',
                  defaultMessage: 'Fullname',
                })}
                name="certificate.cert_fullname"
                id="cert_fullname"
                labelTop={true}
                value={values.certificate.cert_fullname}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-w18">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.certificate.form.email',
                  defaultMessage: 'Email',
                })}
                name="certificate.cert_email"
                id="cert_email"
                labelTop={true}
                value={values.certificate.cert_email}
                onChange={handleChange}
              />
            </div>
          </div>
          {props.modify && (
            <div>
              <div className="row">
                <div className="col-sm-w12">
                  <InputMonetary
                    label={props.intl.formatMessage({
                      id: 'app.features.certificate.form.output_mnt',
                      defaultMessage: 'Amount',
                    })}
                    name="certificate.cert_output_mnt"
                    id="cert_output_mnt"
                    labelTop={true}
                    disabled={true}
                    inputMoney={values.certificate.cert_output_money}
                    value={values.certificate.cert_output_mnt}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-w12">
                  <InputText
                    label={props.intl.formatMessage({
                      id: 'app.features.certificate.form.data1',
                      defaultMessage: 'Data',
                    })}
                    name="certificate.cert_data1"
                    id="cert_data1"
                    labelTop={true}
                    disabled={true}
                    value={values.certificate.cert_data1}
                    append={values.certificate.cert_unit_unit}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-w12">
                  <InputDate
                    label={intl.formatMessage({
                      id: 'app.features.donation.form.printTs',
                      defaultMessage: 'Printed on',
                    })}
                    labelTop={true}
                    name="cert_print_ts"
                    id="cert_print_ts"
                    inputSize={36}
                    value={values.certificate.cert_print_ts}
                    onChange={handleChange}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row" />
            </div>
          )}
        </div>
      )}
      <hr />
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

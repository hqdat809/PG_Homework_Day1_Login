import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITableItem } from 'models/table';
import { currencyFormat, formatColorStatus, STATUS_NAME } from 'modules/intl/constants';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface Props {
  item: ITableItem;
  page: number;
  setItemChosenDelete(item: ITableItem): void;
}

const ItemTable = (props: Props) => {
  const { item, setItemChosenDelete } = props;
  const modal = document.getElementsByClassName('modal');

  const renderStatus = (item: ITableItem) => {
    let statusItem = '';
    if (item.canceled) {
      statusItem = STATUS_NAME.CANCELLED;
    } else if (item.fulfilled) {
      statusItem = STATUS_NAME.FULFILLED;
    } else if (item.matched || item.approved) {
      statusItem = STATUS_NAME.PROCESSING;
    } else if (item.received) {
      statusItem = STATUS_NAME.RECEIVED;
    } else {
      statusItem = STATUS_NAME.PENDING;
    }
    return statusItem;
  };

  const hanldeClickDelete = (item: ITableItem) => {
    console.log(item);
    modal[0].classList.add('active');
    setItemChosenDelete(item);
  };

  return (
    <tr className="item-table">
      <th scope="row" style={{ color: `${formatColorStatus(renderStatus(item))}` }}>
        {renderStatus(item)}
      </th>
      <td>{moment(item.time_created, 'YYYY-MM-DD').toDate().toDateString()}</td>
      <td>{item.currency}</td>
      <td>{currencyFormat(item.volume_input_in_input_currency)}</td>
      <td>{item.subpayroll_ids[0]}</td>
      <td>
        <button
          type="button"
          className="btn"
          data-target="#DeleteModal-@customer.customer_id"
          data-toggle="modal"
          onClick={() => {
            console.log(item);
            hanldeClickDelete(item);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default ItemTable;

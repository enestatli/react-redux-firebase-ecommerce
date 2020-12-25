import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import moment from 'moment';

const columns = [
  {
    id: 'orderCreatedDate',
    label: 'Order Date',
  },
  {
    id: 'documentID',
    label: 'Order ID',
  },
  {
    id: 'orderTotal',
    label: 'Amount',
  },
];

const styles = {
  fontSize: '16px',
  cursor: 'pointer',
  width: '10%',
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case 'orderTotal':
      return `$${columnValue}`;
    case 'orderCreatedDate':
      return moment(columnValue.nano).format('DD/MM/YYYY');

    default:
      return columnValue;
  }
};

const OrderHistory = ({ orders }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => {
              const { label } = column;
              return (
                <TableCell key={pos} style={styles}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formatedText = formatText(columnName, columnValue);
                    return (
                      <TableCell key={pos} style={styles}>
                        {formatedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;

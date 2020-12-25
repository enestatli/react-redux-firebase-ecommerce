import { firestore } from '../../firebase/utils';

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('orders')
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

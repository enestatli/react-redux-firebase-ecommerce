import { auth, firestore } from '../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login',
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('orders').orderBy('orderCreatedDate');
    ref = ref.where('orderUserID', '==', uid);

    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentdID: doc.id,
            };
          }),
        ];
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

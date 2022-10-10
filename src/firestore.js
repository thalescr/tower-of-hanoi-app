import firestore from '@react-native-firebase/firestore';

const collections = {
  plays: firestore().collection('plays'),
};

export const list = async name => {
  return collections[name].get();
};

export const create = async (name, data) => {
  return collections[name].add(data);
};

export const retrieve = async (name, id) => {
  return collections[name].doc(id).get();
};

export const update = async (name, id, data) => {
  return collections[name].doc(id).update(data);
};

export const remove = async (name, id) => {
  return collections[name].doc(id).delete();
};

import firestore from '@react-native-firebase/firestore';

const collections = {
  plays: firestore().collection('plays'),
};

export const queryRank = async level => {
  return collections['plays']
    .where('level', '==', level)
    .where('movements', '==', 2 ** (level + 2) - 1)
    .orderBy('time')
    .limit(5)
    .get();
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

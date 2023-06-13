import {writeFile} from 'fs';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, query, getDocs} from 'firebase/firestore';
import firebaseConfig from './firebase.js';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const playsRef = collection(db, 'plays');

getDocs(query(playsRef)).then(ss => {
  const rows = [];
  ss.forEach(doc => {
    const d = doc.data();
    d.timestamp = new Date(
      doc._document.createTime.timestamp.seconds * 1000,
    ).toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
    rows.push(
      `${d.player || ''},${d.timestamp},${
        d.name ? d.name.replaceAll(',', '') : ''
      },${d.gender || ''},${d.age || ''},${d.level},${d.time},${d.movements},${
        d.grade || ''
      }`,
    );
  });
  writeFile('./output.csv', rows.join('\n'), () => {});
});

process.exit();

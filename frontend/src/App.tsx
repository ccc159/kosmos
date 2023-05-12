import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { onValue } from '@firebase/database';
import { piecesRef } from './db';

function App() {
  const [pieces, setPieces] = useState<IPiece[]>([]);

  useEffect(() => {
    onValue(piecesRef, (snapshot) => {
      setPieces(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <Layout>
      <div></div>
      <h1>Vite + React</h1>
      <div className='card'>
        {pieces.map((piece) => (
          <div key={piece.id}>
            <h2>{piece.name}</h2>
            <p>{piece.description}</p>
          </div>
        ))}
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </Layout>
  );
}

export default App;

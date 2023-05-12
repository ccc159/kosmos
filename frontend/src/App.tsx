import Layout from './components/Layout';
import { usePieces } from './db';

function App() {
  const pieces = usePieces();

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

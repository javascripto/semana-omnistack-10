import React, { useEffect, useState } from 'react';
import api from './services/api';
import { DevItems } from './components/DevItem';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

import avatar from './avatar.svg';
import DevForm from './components/DevForm';

const getDevExample = () => ({
  name: 'Fulano de Tal',
  avatar_url: avatar,
  techs: ['ReactJS', 'React Native', 'Node.js'],
  bio: 'Programador por profissão e também nas horas vagas',
  github_username: 'javascripto',
  _id: Math.random()
});

const devsExample = Array.from([1, 2, 3], i => getDevExample());

function App() {
  const [devs, setDevs] = useState(devsExample);

  useEffect(() => {
    (async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    })();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/dev', data);
    setDevs([...devs, response.data]);    
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          <DevItems devs={devs} />
        </ul>
      </main>
    </div>
  );
}

export default App;

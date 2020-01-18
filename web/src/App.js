import React, { useEffect, useState } from 'react';
import api from './services/api';
import { DevItems } from './components/DevItem';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

import avatar from './avatar.svg';

const getDevExample = () => ({
  name: 'Fulano de Tal',
  avatar_url: avatar,
  techs: ['ReactJS', 'React Native', 'Node.js'],
  bio: 'Programador por profissão e também nas horas vagas',
  github_username: 'javascripto',
  _id: Math.random()
});

function App() {
  const [devs, setDevs] = useState(Array.from([1, 2, 3], i => getDevExample()));
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords: { latitude, longitude } } = position;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => console.error(error)
    );
  }, []);

  useEffect(() => {
    (async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    })();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();
    const response = await api.post('/dev', {
      github_username,
      techs,
      latitude,
      longitude,
    });

    setDevs([...devs, response.data]);

    setTechs('');
    setGithubUsername('');
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
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

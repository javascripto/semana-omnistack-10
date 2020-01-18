import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

import avatar from './avatar.svg';


function App() {
  const [devs, setDevs] = useState([]);
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
      console.log(devs);
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

    console.log(response.data);

    setGithubUsername('');
    setTechs('');
    setLatitude('');
    setLongitude('');
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
          {[1,2,3].map((item, key) => 
          <li className="dev-item" key={key}>
            <header>
              <img src={avatar} alt="Fulano de tal"/>
              <div className="user-info">
                <strong>Fulano de Tal</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Programador por profissão e também nas horas vagas</p>
            <a href="https://github.com/javascripto">Acessar perfil no Github</a>
          </li>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;

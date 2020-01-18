import React from 'react';

import './style.css';

export default function DevItem({ dev }) {
  const { avatar_url, name, github_username, techs, bio } = dev;
  return (
    <li className="dev-item">
      <header>
        <img src={avatar_url} alt="Fulano de tal"/>
        <div className="user-info">
          <strong>{name}</strong>
          <span>{techs.join(', ')}</span>
        </div>
      </header>
      <p>{bio}</p>
      <a href={`https://github.com/${github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export function DevItems({ devs }) {
  return devs.map(dev => <DevItem key={dev._id} dev={dev} /> );
}

import React from 'react';
import GitHubLogo from '../github-logo';
import './header.css';

const Header = () => (
  <header className="header">
    <div className="g-row">
      <div className="g-col">
        <h1 className="header__title">React Saga Example</h1>
        <ul className="header__actions">
          <li>
            <a className="link link--github" href="https://github.com/kursatarslan">
              <GitHubLogo />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
);
export default Header;

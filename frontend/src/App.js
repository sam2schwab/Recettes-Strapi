import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const SETTINGS_QUERY = gql`
  query {
    setting {
      message
    }
  }
`;

function App() {
  const { data } = useQuery(SETTINGS_QUERY);

  return (
    <div className="App font-body">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {data && (
          <p>
            {data.setting.message ? (
              `Message : ${data.setting.message}`
            ) : (
              <>
                Pas encore de message, visiter{' '}
                <a
                  className="App-link"
                  href="http://localhost:1337/admin"
                  target="_blank"
                  rel="noreferrer"
                >
                  strapi
                </a>{' '}
                pour le configurer
              </>
            )}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;

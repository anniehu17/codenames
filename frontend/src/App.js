import logo from './logo.svg';
import './App.css';

function App() {
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }

  // const user = {
  //   firstName: 'Evan',
  //   lastName: 'Cowin'
  // };
  const user = '';

  const element = (
    <h1>
      Hello, {formatName(user)}!
    </h1>
  );

  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }

  return (
    <div className="App">
      <h1>{getGreeting(user)}</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

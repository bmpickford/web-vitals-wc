import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React with Web Vitals WC</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <div>Hover over the bottom left icon for web vitals</div>
      </header>
      <div class="web-vitals">
        <web-vitals-wc></web-vitals-wc>
      </div>
    </div>
  );
}

export default App;

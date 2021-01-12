import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import routes from './resources/json/routes';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import Search from './components/Search';
import Login from './components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Route exact path={`(${routes.client.root}|${routes.client.home})`} component={Home}/>
        <Route path={routes.client.pokemon} component={Pokemon}/>
        <Route path={routes.client.search} component={Search}/>
        <Route path={routes.client.login} component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

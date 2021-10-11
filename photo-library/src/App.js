import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Album from './Pages/PhotoAlbum';
import Library from './Pages/PhotoLibrary';
import Upload from './Pages/Upload';


function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Sidebar/>
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/albums' component={Album} />
              <Route path='/photolibrary' component={Library} />
              <Route path='/upload' component={Upload} />
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
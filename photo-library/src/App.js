import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Albums from './Pages/PhotoAlbum';
import Library from './Pages/PhotoLibrary';
import Upload from './Pages/Upload';
import NoMatch from './Pages/NoMatch';


function App() {
  return (
    <div className="App">
      {/*Header*/}
      <Header />
      <>
        <Router>
          <Sidebar />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/photolibrary' component={Library} />
              <Route exact path='/albums' component={Albums} />
              <Route exact path='/upload' component={Upload} />
              <Route component={NoMatch} />
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
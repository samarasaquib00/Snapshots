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

      <div className='app_body'>
      <>
        <Router>
          <Sidebar />
          <Switch>
              <Route exact path='/' component={Home} className='displayed_page' />
              <Route exact path='/photolibrary' component={Library} className='displayed_page' />
              <Route exact path='/albums' component={Albums} className='displayed_page' />
              <Route exact path='/upload' component={Upload} className='displayed_page' />
              <Route component={NoMatch} className='displayed_page' />
          </Switch>
        </Router>
      </>
      </div>
    </div>
  );
}

export default App;
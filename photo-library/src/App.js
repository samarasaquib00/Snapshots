import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Albums from './Pages/PhotoAlbum';
import Library from './Pages/PhotoLibrary';
import Upload from './Pages/Upload';
import NoMatch from './Pages/NoMatch';
import Login from './Pages/Login';
import Forgot from './Pages/ForgotPassword';
import Signup from './Pages/SignUp';
import Settings from './Pages/Settings';
import Shared from './Pages/SharedLibrary';
import Metadata from './Pages/Metadata';
import Edit from './Pages/Edit';


function App() {
  return (
    <div className="App">
      <Router>
        {/*Header*/}
        <Header />
        <div className='app_body'>
          <>
          <div className= 'body'>
            <Sidebar />
            <Switch>
              <Route exact path='/' component={Home} className='displayed_page' />
              <Route exact path='/photolibrary' component={Library} className='displayed_page' />
              <Route exact path='/albums' component={Albums} className='displayed_page' />
              <Route exact path='/shared' component={Shared} className='displayed_page' />
              <Route exact path='/upload' component={Upload} className='displayed_page' />
              <Route exact path='/login' component={Login} className='displayed_page' />
              <Route exact path='/signup' component={Signup} className='displayed_page' />
              <Route exact path='/settings' component={Settings} className='displayed_page' />
              <Route exact path='/forgot-password' component={Forgot} className='displayed_page' />
              <Route exact path='/metadata' component={Metadata} className='displayed_page' />
              <Route exact path='/edit' component={Edit} className='displayed_page' />
              <Route component={NoMatch} className='displayed_page' />
            </Switch>
          </div>
          </>   
        </div>
      </Router>
    </div>
  );
}

export default App;
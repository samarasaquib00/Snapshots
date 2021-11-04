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

const instance = axios.create({
  baseURL: '127.0.0.1/api/',
  headers: {"Content-Type": "image/jpeg"},
});

axios.get()
async function postPhoto() {
  const photo = x; //file for upload
  try {
    const res = await instance.post("/photoupload?uid=1", { //POST request where uid= current user  EDIT uid=1 is hardcoded
      headers: {
        'Content-Type': photo
      }
    });

    console.log(JSON.stringify(res));//print success
  } catch (err) {
    console.log(JSON.stringify(err)); //print error
  }
}

async function getPhoto(){
  try{
    const res = await instance.get("/photo/2") //EDIT 2 is hardcoded

    console.log(JSON.stringify(res));
  } catch (err){
    console.log(JSON.stringify(err));
  }
}

async function getPhotoMetaData(){
  try{
    const res = await instance.get("127.0.0.1/api/photometadata/2") //EDIT 2 is hardcoded

    console.log(JSON.stringify(res));
  } catch (err){
    console.log(JSON.stringify(err));
  }
}

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
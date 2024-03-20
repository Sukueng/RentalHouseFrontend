// import './App.css';
import Home from './Component/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';
import Post from './Component/Post';
import Login from './Component/Login';
import CreatePost from './Component/CreatePost';



function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/post" element={<Post/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/createpost" element={<CreatePost/>}></Route>
        </Routes>
       </Router>
    </div>
  );
}

export default App;

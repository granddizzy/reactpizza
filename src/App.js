import './scss/app.scss';

import {Route, Routes} from 'react-router-dom';

import Header from "./components/Header";
import Home from './pages/Home';
import NotFount from "./pages/NotFount";
import Cart from "./pages/Cart";
import HeaderCart from "./components/HeaderCart";
import Pizza from "./pages/Pizza";

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="container">
          <Header/>
          <HeaderCart/>
        </div>
      </div>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/pizza/:id" element={<Pizza/>}/>
            <Route path="*" element={<NotFount/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
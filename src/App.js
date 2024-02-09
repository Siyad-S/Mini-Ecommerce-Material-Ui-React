import './App.css';
import { Routes, Route} from "react-router-dom"
import UserProducts from './components/Layout/UserProducts/UserProducts';
import AdminProducts from './components/Layout/AdminProducts/AdminProducts';
import SingleProduct from './components/Layout/SingleProduct/SingleProduct'
import Cart from './components/Layout/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserProducts />}></Route>
        <Route path='/admin' element={<AdminProducts />}></Route>
        <Route path='/single_product/:id' element={<SingleProduct />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;

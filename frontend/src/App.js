import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoffeeList from './Components/CoffeeList';
import CoffeeDetail from './Components/CoffeeDetail';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import AddCoffee from './Components/AddCoffee';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/coffee/:coffeeId" element={<CoffeeDetail />} />
                <Route path="/" element={<CoffeeList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addcoffee" element={<AddCoffee />} />
            
            </Routes>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Система управления доставкой</h1>
          <nav>
            <Link to="/">Список заказов</Link>
            <Link to="/create">Создать заказ</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/create" element={<OrderForm />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
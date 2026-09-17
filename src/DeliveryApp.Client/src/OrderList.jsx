import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading orders:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Загрузка заказов...</div>;
  }

  return (
    <div className="card">
      <h2>Список заказов</h2>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>Заказов пока нет</h3>
          <p>Создайте первый заказ на доставку!</p>
          <Link to="/create" className="btn btn-primary" style={{marginTop: '20px'}}>
            Создать заказ
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Номер заказа</th>
                <th>Отправитель</th>
                <th>Получатель</th>
                <th>Вес</th>
                <th>Планируемая дата отправки</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <span className="badge badge-info">{order.orderNumber}</span>
                  </td>
                  <td>{order.senderCity}, {order.senderAddress}</td>
                  <td>{order.receiverCity}, {order.receiverAddress}</td>
                  <td className="weight-cell">{order.weight} кг</td>
                  <td>{formatDate(order.pickupDate)}</td>
                  <td>
                    <Link to={`/order/${order.id}`} className="btn btn-primary">
                      Просмотр
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
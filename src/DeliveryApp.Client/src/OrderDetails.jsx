import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading order:', err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Загрузка информации о заказе...</div>;
  }

  if (!order) {
    return <div className="card"><h2>Заказ не найден</h2></div>;
  }

  return (
    <div className="details">
      <h2>Заказ {order.orderNumber}</h2>
      
      <div className="detail-row">
        <span className="detail-label">Город отправителя:</span>
        <span className="detail-value">{order.senderCity}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Адрес отправителя:</span>
        <span className="detail-value">{order.senderAddress}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Город получателя:</span>
        <span className="detail-value">{order.receiverCity}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Адрес получателя:</span>
        <span className="detail-value">{order.receiverAddress}</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Вес груза:</span>
        <span className="detail-value">{order.weight} кг</span>
      </div>
      
      <div className="detail-row">
        <span className="detail-label">Планируемая дата отправки:</span>
        <span className="detail-value">{formatDate(order.pickupDate)}</span>
      </div>

      <div style={{marginTop: '30px', textAlign: 'center'}}>
        <Link to="/" className="btn btn-secondary">
          Назад к списку
        </Link>
      </div>
    </div>
  );
}
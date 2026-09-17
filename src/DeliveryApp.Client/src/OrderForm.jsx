import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderCity: '',
    senderAddress: '',
    receiverCity: '',
    receiverAddress: '',
    weight: '',
    pickupDate: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post('/api/orders', {
        senderCity: formData.senderCity,
        senderAddress: formData.senderAddress,
        receiverCity: formData.receiverCity,
        receiverAddress: formData.receiverAddress,
        weight: parseFloat(formData.weight),
        pickupDate: formData.pickupDate
      });
      navigate('/');
    } catch (error) {
      alert('Ошибка при создании заказа. Проверьте все поля.');
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Новый заказ</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Город отправителя</label>
          <input 
            name="senderCity" 
            required 
            value={formData.senderCity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Адрес отправителя</label>
          <input 
            name="senderAddress" 
            required 
            value={formData.senderAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Город получателя</label>
          <input 
            name="receiverCity" 
            required 
            value={formData.receiverCity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Адрес получателя</label>
          <input 
            name="receiverAddress" 
            required 
            value={formData.receiverAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Вес груза (кг)</label>
          <input 
            name="weight" 
            type="number" 
            step="0.1" 
            min="0.1"
            required 
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Планируемая дата отправки</label>
          <input 
            name="pickupDate" 
            type="date" 
            required 
            value={formData.pickupDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Создание...' : 'Создать заказ'}
        </button>
      </form>
    </div>
  );
}
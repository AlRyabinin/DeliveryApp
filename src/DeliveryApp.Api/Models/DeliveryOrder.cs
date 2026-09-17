using System.ComponentModel.DataAnnotations;

namespace DeliveryApp.Api.Models
{
    /// <summary>
    /// Представляет заказ на доставку в системе.
    /// </summary>
    public class DeliveryOrder
    {
        /// <summary>
        /// Уникальный идентификатор заказа в базе данных.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Автоматически сгенерированный номер заказа (например, ORD-20231024-A1B2).
        /// </summary>
        public string OrderNumber { get; set; } = string.Empty;

        /// <summary>
        /// Город отправителя. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Город отправителя обязателен")]
        public string SenderCity { get; set; } = string.Empty;

        /// <summary>
        /// Адрес отправителя. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Адрес отправителя обязателен")]
        public string SenderAddress { get; set; } = string.Empty;

        /// <summary>
        /// Город получателя. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Город получателя обязателен")]
        public string ReceiverCity { get; set; } = string.Empty;

        /// <summary>
        /// Адрес получателя. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Адрес получателя обязателен")]
        public string ReceiverAddress { get; set; } = string.Empty;

        /// <summary>
        /// Вес груза в килограммах. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Вес груза обязателен")]
        [Range(0.1, 10000, ErrorMessage = "Вес должен быть больше 0")]
        public decimal Weight { get; set; }

        /// <summary>
        /// Планируемая дата забора груза. Обязательное поле.
        /// </summary>
        [Required(ErrorMessage = "Дата забора груза обязательна")]
        public DateTime PickupDate { get; set; }
    }
}

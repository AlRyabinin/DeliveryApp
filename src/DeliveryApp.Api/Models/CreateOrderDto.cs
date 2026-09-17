using System.ComponentModel.DataAnnotations;

namespace DeliveryApp.Api.Models
{
    /// <summary>
    /// DTO для создания нового заказа.
    /// </summary>
    public class CreateOrderDto
    {
        [Required] 
        public string SenderCity { get; set; } = string.Empty;

        [Required] 
        public string SenderAddress { get; set; } = string.Empty;

        [Required] 
        public string ReceiverCity { get; set; } = string.Empty;

        [Required] 
        public string ReceiverAddress { get; set; } = string.Empty;

        [Required] 
        public decimal Weight { get; set; }

        [Required] 
        public DateTime PickupDate { get; set; }
    }
}

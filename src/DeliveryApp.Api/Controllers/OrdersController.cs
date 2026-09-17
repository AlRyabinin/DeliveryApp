using DeliveryApp.Api.Data;
using DeliveryApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Api.Controllers
{
    /// <summary>
    /// Контроллер для управления заказами на доставку.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Получает список всех созданных заказов.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryOrder>>> GetOrders()
        {
            return await _context.Orders.OrderByDescending(o => o.Id).ToListAsync();
        }

        /// <summary>
        /// Получает конкретный заказ по его ID в режиме чтения.
        /// </summary>
        /// <param name="id">Идентификатор заказа.</param>
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryOrder>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if(order == null) return NotFound();
            return order;
        }

        /// <summary>
        /// Создает новый заказ на доставку.
        /// </summary>
        /// <param name="dto">Данные для создания заказа.</param>
        [HttpPost]
        public async Task<ActionResult<DeliveryOrder>> CreateOrder(CreateOrderDto dto)
        {
            var order = new DeliveryOrder
            {
                SenderCity = dto.SenderCity,
                SenderAddress = dto.SenderAddress,
                ReceiverCity = dto.ReceiverCity,
                ReceiverAddress = dto.ReceiverAddress,
                Weight = dto.Weight,
                PickupDate = dto.PickupDate,
                OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
    }
}

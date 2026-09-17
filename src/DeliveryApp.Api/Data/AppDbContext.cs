using DeliveryApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Api.Data
{
    /// <summary>
    /// Контекст базы данных для управления сущностями доставки.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /// <summary>
        /// Набор данных заказов на доставку.
        /// </summary>
        public DbSet<DeliveryOrder> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DeliveryOrder>().HasIndex(o => o.OrderNumber).IsUnique();
        }
    }
}

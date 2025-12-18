using visnam.pos.bll.DTOs;
using visnam.pos.dal.Models;
using visnam.pos.dal.Repositories;

namespace visnam.pos.bll.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Order CreateOrder(CreateOrderRequest request)
        {
            var order = new Order
            {
                OrderId = Guid.NewGuid(),
                TotalAmount = request.TotalAmount,
                CreatedAt = DateTime.Now
            };

            _orderRepository.Add(order);
            return order;
        }

        public IEnumerable<Order> GetOrders()
        {
            return _orderRepository.GetAll();
        }
    }
}

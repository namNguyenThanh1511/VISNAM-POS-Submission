using visnam.pos.bll.DTOs;
using visnam.pos.dal.Models;

namespace visnam.pos.bll.Services
{
    public interface IOrderService
    {
        Order CreateOrder(CreateOrderRequest request);
        IEnumerable<Order> GetOrders();
    }
}

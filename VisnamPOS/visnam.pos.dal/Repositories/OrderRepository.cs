using visnam.pos.dal.Models;

namespace visnam.pos.dal.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        public IEnumerable<Order> GetAll()
        {
            return FakeDatabase.Orders;
        }

        public void Add(Order order)
        {
            FakeDatabase.Orders.Add(order);
        }
    }
}

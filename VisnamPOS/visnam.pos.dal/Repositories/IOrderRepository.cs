using visnam.pos.dal.Models;

namespace visnam.pos.dal.Repositories
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll();
        void Add(Order order);
    }
}

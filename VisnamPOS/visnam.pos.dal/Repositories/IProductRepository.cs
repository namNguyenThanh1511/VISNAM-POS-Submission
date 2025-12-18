using visnam.pos.dal.Models;

namespace visnam.pos.dal.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
    }
}

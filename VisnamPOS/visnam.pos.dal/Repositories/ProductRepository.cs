using visnam.pos.dal.Models;

namespace visnam.pos.dal.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public IEnumerable<Product> GetAll()
        {
            return FakeDatabase.Products;
        }
    }
}

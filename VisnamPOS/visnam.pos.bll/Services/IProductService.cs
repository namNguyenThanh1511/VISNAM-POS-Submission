using visnam.pos.dal.Models;

namespace visnam.pos.bll.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts();
    }
}

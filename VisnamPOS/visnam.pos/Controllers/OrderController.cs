using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using visnam.pos.api.Hubs;
using visnam.pos.bll.DTOs;
using visnam.pos.bll.Services;

namespace visnam.pos.api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IHubContext<OrderHub> _hubContext;
        private readonly IOrderService _orderService;

        public OrderController(IHubContext<OrderHub> hubContext, IOrderService orderService)
        {
            _hubContext = hubContext;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var order = _orderService.CreateOrder(request);

            await _hubContext.Clients.All
                .SendAsync("OrderCreated", order);

            return Ok(order);
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(_orderService.GetOrders());
        }

    }
}

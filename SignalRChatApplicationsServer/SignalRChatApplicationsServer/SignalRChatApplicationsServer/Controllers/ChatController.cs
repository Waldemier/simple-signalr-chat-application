using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChatApplicationsServer.Hubs;
using SignalRChatApplicationsServer.Hubs.Clients;
using SignalRChatApplicationsServer.Models;

namespace SignalRChatApplicationsServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        // Can be without second parameter, but we will cant use IChatClient implemented methods
        private readonly IHubContext<ChatHub, IChatClient> _hub;  
        
        public ChatController(IHubContext<ChatHub, IChatClient> hub)
        {
            this._hub = hub;
        }

        [HttpPost("messages")]
        public async Task Post(ChatMessage message)
        {
            // some logic ...
            // "emit" method
            await this._hub.Clients.All.ReceiveMessage(message); // event "ReceiveMessage" who we accept on the client (on method)
        }
    }
}
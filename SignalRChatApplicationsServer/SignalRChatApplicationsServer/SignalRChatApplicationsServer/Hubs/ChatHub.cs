using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRChatApplicationsServer.Hubs.Clients;
using SignalRChatApplicationsServer.Models;

namespace SignalRChatApplicationsServer.Hubs
{
    public class ChatHub: Hub<IChatClient>
    {
        // commented, because we created the controller
        /*public async Task SendMessage(ChatMessage message) // "on" method on the server
        {
            await Clients.All.ReceiveMessage(message); "emit" method on the server
        }*/
    }
}
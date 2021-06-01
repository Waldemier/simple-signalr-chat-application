using System.Threading.Tasks;
using SignalRChatApplicationsServer.Models;

namespace SignalRChatApplicationsServer.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
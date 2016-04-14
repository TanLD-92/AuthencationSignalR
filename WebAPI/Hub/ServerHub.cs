using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebAPI
{
    [HubName("serverHub")]
    [Authorize]
    public class ServerHub : Hub
    {
        public override Task OnConnected()
        {
            return Clients.All.joined(GetAuthInfo());
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
        protected object GetAuthInfo()
        {
            var user = Context.User;
            return new
            {
                IsAuthenticated = user.Identity.IsAuthenticated,
                IsAdmin = user.IsInRole("Admin"),
                UserName = user.Identity.Name
            };
        }
        public Task SendChatMessage()
        {
            string name;
            var user = Context.User;

            if (user.Identity.IsAuthenticated)
            {
                name = user.Identity.Name;
            }
            else
            {
                name = "anonymous";
            }
            return Clients.All.addMessageToPage(name, "hello");
        }
    }
}
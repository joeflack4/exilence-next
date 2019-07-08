using ExilenceNextAPI.Interfaces.Hubs;
using ExilenceNextAPI.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Hubs
{
    public class GroupHub : Hub<IGroupHub>, IGroupHub
    {
        private readonly IConfiguration _configuration;
        private readonly IGroupService _groupService;

        public GroupHub(IConfiguration configuration, IGroupService groupService)
        {
            _configuration = configuration;
            _groupService = groupService;
        }

        public async Task<bool> Join(string group)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
            await _groupService.JoinGroup(Context.ConnectionId, group);
            return true;
        }

        public Task Patch(string data)
        {
            throw new NotImplementedException();
        }


        public override Task OnConnectedAsync()
        {
            _groupService.AddConnection(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _groupService.RemoveConnection(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }


    }
}

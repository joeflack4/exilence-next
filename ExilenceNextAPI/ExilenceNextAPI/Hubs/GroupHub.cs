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


        public override async Task OnConnectedAsync()
        {
            await _groupService.AddConnection(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _groupService.RemoveConnection(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }


        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }


    }
}

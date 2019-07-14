using ExilenceNextAPI.Entities;
using ExilenceNextAPI.Interfaces.Repositories;
using ExilenceNextAPI.Interfaces.Services;
using ExilenceNextAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Services
{
    public class GroupService : IGroupService
    {
        private readonly IConfiguration _configuration;
        private readonly IGroupRepository _groupRepository;

        public GroupService(IConfiguration configuration, IGroupRepository groupRepository)
        {
            _configuration = configuration;
            _groupRepository = groupRepository;
        }        

        public async Task<ConnectionModel> GetConnection(string connectionId)
        {
            var connection = await _groupRepository.GetConnection(connectionId);
            return new ConnectionModel()
            {
                ConnectionId = connection.ConnectionId,
                Connected = connection.Connected,
                LastSeen = connection.LastSeen
            };
        }

        public async Task JoinGroup(string ConnectionId, string GroupName)
        {
            await _groupRepository.JoinGroupAsync(ConnectionId, GroupName);
        }

        public async Task AddConnection(string ConnectionId)
        {
            var connection = new Connection()
            {
                ConnectionId = ConnectionId,
                Connected = DateTime.UtcNow,
                LastSeen = DateTime.UtcNow,
            };
            await _groupRepository.AddConnection(connection);
        }

        public async Task RemoveConnection(string ConnectionId)
        {
            await _groupRepository.RemoveConnection(ConnectionId);
        }
    }
}

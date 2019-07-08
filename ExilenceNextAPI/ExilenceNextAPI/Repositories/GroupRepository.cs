using ExilenceNextAPI.Entities;
using ExilenceNextAPI.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly IConfiguration _configuration;

        public GroupRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await Task.FromResult(new Connection()
            {
                ConnectionId = connectionId,
                Connected = DateTime.UtcNow,
                LastSeen = DateTime.UtcNow
            });
        }

        public async Task JoinGroup(string ConnectionId, string GroupName)
        {
            await Task.Delay(100);
        }
    }
}

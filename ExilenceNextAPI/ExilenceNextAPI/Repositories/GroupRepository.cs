using ExilenceNextAPI.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task JoinGroup(string ConnectionId, string GroupName)
        {
            await Task.Delay(0);
        }
    }
}

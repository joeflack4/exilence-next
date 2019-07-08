using ExilenceNextAPI.Interfaces.Repositories;
using ExilenceNextAPI.Interfaces.Services;
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

        public async Task JoinGroup(string ConnectionId, string GroupName)
        {
            await _groupRepository.JoinGroup(ConnectionId, GroupName);
        }
    }
}

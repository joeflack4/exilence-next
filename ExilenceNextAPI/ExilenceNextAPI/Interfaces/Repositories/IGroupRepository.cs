using ExilenceNextAPI.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Interfaces.Repositories
{
    public interface IGroupRepository
    {
        Task JoinGroup(string ConnectionId, string GroupName);
        Task<Connection> GetConnection(string connectionId);
        Task RemoveConnection(string ConnectionId);
        Task AddConnection(Connection connection);
    }
}

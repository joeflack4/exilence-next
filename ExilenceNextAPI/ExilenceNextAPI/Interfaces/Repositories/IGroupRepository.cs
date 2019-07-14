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
        Task<Connection> GetConnection(string connectionId);
        Task JoinGroupAsync(string connectionId, string group);
        Task RemoveConnection(string ConnectionId);
        Task AddConnection(Connection connection);
    }
}

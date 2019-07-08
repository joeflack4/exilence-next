using ExilenceNextAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Interfaces.Services
{
    public interface IGroupService
    {
        Task JoinGroup(string ConnectionId, string GroupName);
        Task<ConnectionModel> GetConnection(string connectionId);
    }
}

using ExilenceNextAPI.Entities;
using ExilenceNextAPI.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ExilenceContext _context;

        public GroupRepository(IConfiguration configuration, ExilenceContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FirstOrDefaultAsync(t => t.ConnectionId == connectionId);
        }
        public async Task AddConnection(Connection connection)
        {
            await _context.Connections.AddAsync(connection);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveConnection(string connectionId)
        {
            var connection = await GetConnection(connectionId);
            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();
        }

        public async Task JoinGroupAsync(string connectionId, string group)
        {
            var connection = await _context.Connections.FirstOrDefaultAsync(c => c.ConnectionId == connectionId);
            await _context.SaveChangesAsync();
        }
    }
}

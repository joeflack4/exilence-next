using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Interfaces.Hubs
{
    public interface IGroupHub
    {
        Task Join(string group);
        Task Patch(string data);
    }
}

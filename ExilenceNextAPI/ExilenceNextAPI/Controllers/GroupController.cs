using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExilenceNextAPI.Hubs;
using ExilenceNextAPI.Interfaces.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ExilenceNextAPI.Controllers
{
    public class GroupController : Controller
    {

        IHubContext<GroupHub, IGroupHub> _groupHub;

        public IActionResult Index()
        {
            return Ok("Group Controller OK");
        }


        [HttpPatch]
        public void Patch([FromBody] string data)
        {
            _groupHub.Clients.Group("").Patch(data);
        }

    }
}
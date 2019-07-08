using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExilenceNextAPI.Hubs;
using ExilenceNextAPI.Interfaces.Hubs;
using ExilenceNextAPI.Interfaces.Services;
using ExilenceNextAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ExilenceNextAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly IHubContext<GroupHub, IGroupHub> _groupHub;
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok("Group Controller OK");
        }


        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] JsonPatchDocument<GroupStateModel> data)
        {
            var connectionId = Request.Headers["ConnectionId"].ToString();
            var connection = await _groupService.GetConnection(connectionId);

            var oldState = new GroupStateModel() {};
            data.ApplyTo(oldState);

            // Dosen't work with mocked data
            //_groupHub.Clients.GroupExcept(connection.ConnectionId, new List<string> { connectionId });

            return Ok();

        }

    }
}
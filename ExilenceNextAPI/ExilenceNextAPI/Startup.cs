using ExilenceNextAPI.Hubs;
using ExilenceNextAPI.Interfaces.Repositories;
using ExilenceNextAPI.Interfaces.Services;
using ExilenceNextAPI.Repositories;
using ExilenceNextAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace ExilenceNextAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);


            services.AddSignalR(hubOptions =>
            {
                //hubOptions.HandshakeTimeout = TimeSpan.FromSeconds(40);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyHeader();
                        builder.WithOrigins("http://localhost:4200", "http://exilence.app");
                        builder.AllowAnyMethod();
                        builder.AllowCredentials();
                    });
            });

            services.AddDbContext<ExilenceContext>(options => options.UseSqlServer(""));


            services.AddScoped<IGroupService, GroupService>();

            services.AddScoped<IGroupRepository, GroupRepository>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseCors("AllowAlL");
            app.UseFileServer();

            app.UseSignalR(routes =>
            {
                routes.MapHub<GroupHub>("/api/hubs/group", options =>
                {
                    //options.ApplicationMaxBufferSize = 50 * 1024 * 1024;
                    //options.TransportMaxBufferSize = 50 * 1024 * 1024;
                });
            });
        }
    }
}

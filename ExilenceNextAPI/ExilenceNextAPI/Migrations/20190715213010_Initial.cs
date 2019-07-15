using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExilenceNextAPI.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Histories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Histories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stashes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stashes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Account = table.Column<string>(nullable: false),
                    GroupId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    ConnectionId = table.Column<string>(nullable: false),
                    Connected = table.Column<DateTime>(nullable: false),
                    LastSeen = table.Column<DateTime>(nullable: false),
                    PlayerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.ConnectionId);
                    table.ForeignKey(
                        name: "FK_Connections_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Leagues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    PlayerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leagues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leagues_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Snapshots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LeagueId = table.Column<int>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    HistoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Snapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Snapshots_Histories_HistoryId",
                        column: x => x.HistoryId,
                        principalTable: "Histories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Snapshots_Leagues_LeagueId",
                        column: x => x.LeagueId,
                        principalTable: "Leagues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tabs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    N = table.Column<string>(nullable: false),
                    I = table.Column<int>(nullable: false),
                    TabId = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Selected = table.Column<bool>(nullable: false),
                    Colour = table.Column<string>(nullable: false),
                    LeagueId = table.Column<int>(nullable: false),
                    StashId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tabs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tabs_Leagues_LeagueId",
                        column: x => x.LeagueId,
                        principalTable: "Leagues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tabs_Stashes_StashId",
                        column: x => x.StashId,
                        principalTable: "Stashes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TabSnapshots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TabId = table.Column<string>(nullable: false),
                    Value = table.Column<double>(nullable: false),
                    SnapshotId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TabSnapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TabSnapshots_Snapshots_SnapshotId",
                        column: x => x.SnapshotId,
                        principalTable: "Snapshots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Calculated = table.Column<double>(nullable: false),
                    Corrupted = table.Column<bool>(nullable: false),
                    Elder = table.Column<bool>(nullable: false),
                    FrameType = table.Column<double>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    Ilvl = table.Column<double>(nullable: false),
                    Level = table.Column<double>(nullable: false),
                    Links = table.Column<double>(nullable: false),
                    Max = table.Column<double>(nullable: false),
                    Mean = table.Column<double>(nullable: false),
                    Median = table.Column<double>(nullable: false),
                    Min = table.Column<double>(nullable: false),
                    Mode = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Quality = table.Column<double>(nullable: false),
                    Shaper = table.Column<bool>(nullable: false),
                    Sockets = table.Column<double>(nullable: false),
                    StackSize = table.Column<double>(nullable: false),
                    Tier = table.Column<double>(nullable: false),
                    TotalStacksize = table.Column<double>(nullable: false),
                    TypeLine = table.Column<string>(nullable: true),
                    Variant = table.Column<string>(nullable: true),
                    TabId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Tabs_TabId",
                        column: x => x.TabId,
                        principalTable: "Tabs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connections_PlayerId",
                table: "Connections",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_TabId",
                table: "Items",
                column: "TabId");

            migrationBuilder.CreateIndex(
                name: "IX_Leagues_PlayerId",
                table: "Leagues",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_GroupId",
                table: "Players",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Snapshots_HistoryId",
                table: "Snapshots",
                column: "HistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Snapshots_LeagueId",
                table: "Snapshots",
                column: "LeagueId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_LeagueId",
                table: "Tabs",
                column: "LeagueId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_StashId",
                table: "Tabs",
                column: "StashId");

            migrationBuilder.CreateIndex(
                name: "IX_TabSnapshots_SnapshotId",
                table: "TabSnapshots",
                column: "SnapshotId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "TabSnapshots");

            migrationBuilder.DropTable(
                name: "Tabs");

            migrationBuilder.DropTable(
                name: "Snapshots");

            migrationBuilder.DropTable(
                name: "Stashes");

            migrationBuilder.DropTable(
                name: "Histories");

            migrationBuilder.DropTable(
                name: "Leagues");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}

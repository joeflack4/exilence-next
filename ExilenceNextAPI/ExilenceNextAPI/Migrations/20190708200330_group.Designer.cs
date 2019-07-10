﻿// <auto-generated />
using System;
using ExilenceNextAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ExilenceNextAPI.Migrations
{
    [DbContext(typeof(ExilenceContext))]
    [Migration("20190708200330_group")]
    partial class group
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ExilenceNextAPI.Entities.Connection", b =>
                {
                    b.Property<string>("ConnectionId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Connected");

                    b.Property<string>("Group");

                    b.Property<DateTime>("LastSeen");

                    b.HasKey("ConnectionId");

                    b.ToTable("Connections");
                });
#pragma warning restore 612, 618
        }
    }
}
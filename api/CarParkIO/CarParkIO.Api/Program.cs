using CarParkIO.Api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.ConstrainedExecution;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173");
                      });
});

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var estacionamento = new Estacionamento(0, 0);
estacionamento.AdicionarVeiculo(new Veiculo("FXX2321"));

app.MapGet("/listar-veiculos", [AllowAnonymous] () =>
{
    return estacionamento.ListarVeiculos().ToArray();
})
.WithName("CarParkIO")
.WithOpenApi();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseAuthorization();

app.Run();

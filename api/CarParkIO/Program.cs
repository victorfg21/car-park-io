using CarParkIO.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var estacionamento = new Estacionamento(0, 0);

app.MapGet("/listar-veiculos", () =>
{
    return estacionamento.ListarVeiculos().ToArray();
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

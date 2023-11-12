namespace CarParkIO.Api.Models
{
    public class Veiculo
    {
        public Veiculo(string placa)
        {
            Id = Guid.NewGuid();
            Placa = placa;
        }

        public Guid Id { get; private set; }

        public string Placa { get; private set; }
    }
}

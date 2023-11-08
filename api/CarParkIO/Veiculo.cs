namespace CarParkIO.Api
{
    public class Veiculo
    {
        public Veiculo(Guid id, string placa)
        {
            Id = id;
            Placa = placa;
        }

        public Guid Id { get; private set; }

        public string Placa { get; private set; }
    }
}

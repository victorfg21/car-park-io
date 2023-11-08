namespace CarParkIO.Api
{
    public class Estacionamento
    {
        public Estacionamento(decimal precoInicial, decimal precoPorHora)
        {
            PrecoInicial = precoInicial;
            PrecoPorHora = precoPorHora;
            _veiculos = new List<Veiculo>();
        }

        public decimal PrecoInicial { get; set; }

        public decimal PrecoPorHora { get; set; }

        public IReadOnlyCollection<Veiculo> Veiculos => _veiculos;

        public List<Veiculo> _veiculos;

        public bool AdicionarVeiculo(Veiculo veiculo)
        {
            _veiculos.Add(veiculo);
            return true;
        }

        public bool RemoverVeiculo(Veiculo veiculo)
        {
            var veiculoRemover = _veiculos.FirstOrDefault(x => x.Id == veiculo.Id);

            if (veiculoRemover is not null)
            {
                _veiculos.Remove(veiculoRemover);
                return true;
            }

            return false;
        }

        public IEnumerable<Veiculo> ListarVeiculos()
        {
            return Veiculos;
        }

        public void AlterarPrecoInicial(decimal novoPrecoInicial)
            => PrecoInicial = novoPrecoInicial;

        public void AlterarPrecoHora(decimal novoPrecoHora)
            => PrecoPorHora = novoPrecoHora;
    }
}

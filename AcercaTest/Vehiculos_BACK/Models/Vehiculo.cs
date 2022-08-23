using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Vehiculos_BACK
{
    public class Vehiculo
    {
        public int NumPedido { get; set; }
        public string Bastidor { get; set; }
        public string Modelo { get; set; }
        public string Matricula { get; set; }
        public DateTime FechaEntrega { get; set; }
    }
}
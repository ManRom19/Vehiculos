using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace Vehiculos_BACK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {

        private readonly IWebHostEnvironment _hostingEnvironment;

        public VehiculosController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        #region Public Methods
        /// <summary>
        /// Get vehiculos
        /// </summary>
        /// <returns>IActionResult</returns>
        [HttpGet]
        [Route("getVehiculos")]
        public async Task<IActionResult> GetVehiculos([FromQuery] int Page, [FromQuery] int Items)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = ReturnVehiculosData(Page, Items);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        /// <summary>
        /// Add vehiculos
        /// </summary>
        /// <param input="input">Vehiculo data</param>
        /// <returns>IActionResult</returns>
        [HttpPost]
        [Route("addVehiculo")]
        public async Task<IActionResult> AddVehiculo([FromBody] Vehiculo input, [FromQuery] int Page, [FromQuery] int Items)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = CreateVehiculoData(input, Page, Items);

                return Ok(result);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Update vehiculo
        /// </summary>
        /// /// <param input="input">New vehiculo data</param>
        /// <returns>IActionResult</returns>
        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> UpdateVehiculo([FromBody] Vehiculo input, [FromQuery] int Page, [FromQuery] int Items)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = UpdateVehiculoData(input, Page, Items);

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Delete vehiculo
        /// </summary>
        /// <param name="input">Vehiculo numpedido</param>
        /// <returns>IActionResult</returns>
        [HttpGet]
        [Route("delete")]
        public async Task<IActionResult> DeleteVehiculo([FromQuery] int numPedido, [FromQuery] int Page, [FromQuery] int Items)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = RemoveVehiculoData(numPedido.ToString(), Page, Items);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region Private methods


        private List<Vehiculo> ReturnVehiculosData(int Page, int Items)
        {
            string vehiculos = string.Empty;

            XmlDocument document = new XmlDocument();

            document.Load(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");


            List<Vehiculo> listaDeVehiculos = new List<Vehiculo>();

            if (document != null)
            {
                List<XmlNode> xmlNodeList = ReverseXMLNodeList(document.SelectNodes("/data/Vehiculo"));

                string vehiculoTemp = string.Empty;

                Vehiculo vehiculo = new Vehiculo();

                if (Items == 0)
                {

                    foreach (XmlNode xmlNode in xmlNodeList)
                    {
                        vehiculoTemp = JsonConvert.SerializeXmlNode(xmlNode, Newtonsoft.Json.Formatting.None, true);

                        vehiculo = JsonConvert.DeserializeObject<Vehiculo>(vehiculoTemp);

                        listaDeVehiculos.Add(vehiculo);

                    }
                }
                else
                {
                    int NumPage = 0;
                    int numItems = 0;


                    foreach (XmlNode xmlNode in xmlNodeList)
                    {
                        if (NumPage <= Page && numItems <= Items)
                        {
                            if (NumPage == Page && numItems <= Items)
                            {
                                vehiculoTemp = JsonConvert.SerializeXmlNode(xmlNode, Newtonsoft.Json.Formatting.None, true);

                                vehiculo = JsonConvert.DeserializeObject<Vehiculo>(vehiculoTemp);

                                listaDeVehiculos.Add(vehiculo);
                            }

                            numItems++;

                            if (numItems == Items)
                            {
                                NumPage++;
                                numItems = 0;
                            }
                        }
                    }
                }
            }
            return listaDeVehiculos;
        }

        private List<Vehiculo> CreateVehiculoData(Vehiculo input, int Page, int Items)
        {

            try
            {

                XmlDocument document = new XmlDocument();
                document.Load(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");

                XmlElement elemVehiculo = document.CreateElement("Vehiculo");

                XmlElement elemNumeroPedido = document.CreateElement("NumPedido");
                XmlText text = document.CreateTextNode(input.NumPedido.ToString());
                elemNumeroPedido.AppendChild(text);
                elemVehiculo.AppendChild(elemNumeroPedido);

                XmlElement elemBastidor = document.CreateElement("Bastidor");
                text = document.CreateTextNode(input.Bastidor.ToString());
                elemBastidor.AppendChild(text);
                elemVehiculo.AppendChild(elemBastidor);


                XmlElement elemModelo = document.CreateElement("Modelo");
                text = document.CreateTextNode(input.Modelo.ToString());
                elemModelo.AppendChild(text);
                elemVehiculo.AppendChild(elemModelo);


                XmlElement elemMatricula = document.CreateElement("Matricula");
                text = document.CreateTextNode(input.Matricula.ToString());
                elemMatricula.AppendChild(text);
                elemVehiculo.AppendChild(elemMatricula);


                XmlElement elemFechaEntrega = document.CreateElement("FechaEntrega");
                text = document.CreateTextNode(input.FechaEntrega.ToString("yyyy-MM-dd"));
                elemFechaEntrega.AppendChild(text);
                elemVehiculo.AppendChild(elemFechaEntrega);


                document.DocumentElement.AppendChild(elemVehiculo);

                document.Save(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");

                return ReturnVehiculosData(0, Items);
            }
            catch(Exception e)
            {
                return ReturnVehiculosData(0, Items); 
            }

        }

        private List<Vehiculo> UpdateVehiculoData(Vehiculo input, int Page, int Items)
        {
            string vehiculos = string.Empty;

            XmlDocument document = new XmlDocument();

            document.Load(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");

            if (document != null)
            {
                XmlNodeList xmlNodeList = document.SelectNodes("/data/Vehiculo");

                string vehiculoTemp = string.Empty;

                Vehiculo vehiculo = new Vehiculo();

                List<Vehiculo> listaDeVehiculos = new List<Vehiculo>();

                bool removedVehiculo = false;

                foreach (XmlNode xmlNode in xmlNodeList)
                {

                    vehiculoTemp = JsonConvert.SerializeXmlNode(xmlNode, Newtonsoft.Json.Formatting.None, true);

                    vehiculo = JsonConvert.DeserializeObject<Vehiculo>(vehiculoTemp);

                    string numPedido = input.NumPedido.ToString();
                    if (!removedVehiculo && vehiculo.NumPedido.ToString() == numPedido)
                    {
                        xmlNode.ParentNode.RemoveChild(xmlNode);
                        removedVehiculo = true;
                    }

                }


                if (removedVehiculo)
                {
                    document.Save(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");
                    return CreateVehiculoData(input, 0, Items);
                }
            }

            return ReturnVehiculosData(0, Items); 
        }

        private List<Vehiculo> RemoveVehiculoData(string numPedido, int Page, int Items)
        {
            string vehiculos = string.Empty;

            bool removedVehiculo = false;

            XmlDocument document = new XmlDocument();

            document.Load(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");

            if (document != null)
            {
                XmlNodeList xmlNodeList = document.SelectNodes("/data/Vehiculo");

                string vehiculoTemp = string.Empty;

                Vehiculo vehiculo = new Vehiculo();

                foreach (XmlNode xmlNode in xmlNodeList)
                {

                    vehiculoTemp = JsonConvert.SerializeXmlNode(xmlNode, Newtonsoft.Json.Formatting.None, true);

                    vehiculo = JsonConvert.DeserializeObject<Vehiculo>(vehiculoTemp);

                    if (!removedVehiculo && vehiculo.NumPedido.ToString() == numPedido)
                    {
                        xmlNode.ParentNode.RemoveChild(xmlNode);
                        removedVehiculo = true;
                    }

                }

                if (removedVehiculo)
                {
                    document.Save(_hostingEnvironment.ContentRootPath + "/Data/ListadoDeVehiculos.xml");
                }
            }
            return ReturnVehiculosData(0, Items);
        }

        private List<XmlNode> ReverseXMLNodeList(XmlNodeList nodelist)
        {
            List<XmlNode> toReverse = new List<XmlNode>();
            foreach (XmlNode node in nodelist)
            {
                toReverse.Add(node);
            }

            toReverse.Reverse();

            return toReverse;

        }

        #endregion

    }
}

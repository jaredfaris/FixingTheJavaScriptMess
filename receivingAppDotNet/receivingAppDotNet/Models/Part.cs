using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace receivingAppDotNet.Models
{
    public class Part
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Weight { get; set; }
        public bool Discontinued { get; set; }
    }
}
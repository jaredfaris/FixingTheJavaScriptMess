using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.DataServices
{
    public static class PartDataService
    {
        public static readonly List<Part> Parts = new List<Part>();

        /// <summary>
        /// Because your data service should always be static!
        /// </summary>
        static PartDataService()
        {
            string[] fakeNames = {"Anchor", 
                                     "Bottle", 
                                     "Bigger Hammer",
                                     "Cog", 
                                     "Everburning Torch",
                                     "Hammer",
                                     "Really Big Hammer",
                                     "Screwdriver",
                                     "Super Big Hammer",
                                     "Unstoppable Hammer", 
                                 };

            for (var i = 0; i < 10; i++)
            {
                Parts.Add(new Part
                {
                    Id = i,
                    Name = fakeNames[i],
                    Weight = i,
                    Discontinued = (i % 2 == 0) ? true : false
                });
            }            
        }

        public static Part Add(Part part)
        {
            var newId = Parts.Any() ? Parts.Max(x => x.Id) + 1 : 1;

            part.Id = newId;

            Parts.Add(part);

            return part;
        }

        public static void Remove(Part part)
        {
            Parts.Remove(part);
            part.Discontinued = true;
            Parts.Add(part);
        }
    }
}
using System.Collections.Generic;
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
    }
}
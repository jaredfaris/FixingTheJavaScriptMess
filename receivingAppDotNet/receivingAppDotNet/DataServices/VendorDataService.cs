using System;
using System.Collections.Generic;
using System.Linq;
using receivingAppDotNet.Models;

namespace receivingAppDotNet.DataServices
{
    /// <summary>
    /// Because your data service should always be static!
    /// </summary>
    static class VendorDataService
    {
        public static readonly List<Vendor> Vendors = new List<Vendor>();

        static VendorDataService()
        {
            string[] fakeNames = {"Acme", 
                                     "Bob's Hardware", 
                                     "CogCo", 
                                     "DisIsAFakeName", 
                                     "Emeryville Supply",
                                     "Fakestown Indisutrial",
                                     "Great Company LTD",
                                     "Having trouble coming up with more fake names INC",
                                     "IM Nearly Out of Ideas Co",
                                     "My Fake Company"
                                 };

            for (var i = 0; i < 10; i++)
            {
                Vendors.Add(new Vendor
                {
                    Id = i,
                    Address1 = String.Format("{0}{0}{0} Main Street", i),
                    City = "Springfield",
                    State = "IL",
                    Name = fakeNames[i],
                    Zip = String.Format("{0}{0}{0}{0}{0}", i)
                });
            }           
        }

        public static Vendor Add(Vendor vendor)
        {
            var newId = Vendors.Any() ? Vendors.Max(x => x.Id) + 1 : 1;

            vendor.Id = newId;

            Vendors.Add(vendor);

            return vendor;
        }
    }
}
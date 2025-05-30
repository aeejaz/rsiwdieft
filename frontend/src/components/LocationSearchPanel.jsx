import React from 'react'

const LocationSearchPanel = (props) => {


    // sample array for location 
    const locations = [
      "1234 Birch St, Near Johnson's Cafe, Nexus Coding Academy, Austin, TX 78701",
    "5678 Cedar Ave, Near Brown's Cafe, Pinnacle Tech Institute, Portland, OR 97201",
    "9101 Willow Rd, Near Davis's Cafe, Quantum Coding Hub, Raleigh, NC 27601",
    "3456 Spruce Ln, Near Wilson's Cafe, Apex Programming School, Denver, CO 80201"
    ]

    return (
        <div>
            {/* this is just a sample data  */}
            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel
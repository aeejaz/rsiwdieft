import React from 'react'
import bikeX from '../assets/bikeX.png'
import vehicleX from '../assets/vehiclex.png'
import vehicleA4 from '../assets/vehicleA4.png'


const VehiclePanel = (props) => {
    return (
        <div>
            <h6 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanell(false)
            }}><i className="absoulte text-2xl text-gray-400 mb-[-100px] ri-arrow-down-wide-line"></i></h6>
            <h3 className='text-2xl font-semibold -mt-4.5 mb-5'>Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src={vehicleX} alt="white swift car" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>SwiftGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$193.20</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src={bikeX} alt="Orange Swift bike" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$65</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src={vehicleA4} alt="swift yellow auto" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>SwiftAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$118.86</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
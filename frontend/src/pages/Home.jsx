import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import lightninglogo from "../assets/lightninglogo.svg";
import swiftrideblack from "../assets/swiftrideblack.svg";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id });
    }, [user]);

    socket.on("ride-confirmed", (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);
    });

    socket.on("ride-started", (ride) => {
        console.log("ride");
        setWaitingForDriver(false);
        navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
    });

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setPickupSuggestions(response.data);
        } catch {
            // handle error
        }
    };

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: e.target.value },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setDestinationSuggestions(response.data);
        } catch {
            // handle error
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useGSAP(
        function () {
            if (panelOpen) {
                gsap.to(panelRef.current, {
                    height: "70%",
                    padding: 24,
                    // opacity:1
                });
                gsap.to(panelCloseRef.current, {
                    opacity: 1,
                });
            } else {
                gsap.to(panelRef.current, {
                    height: "0%",
                    padding: 0,
                    // opacity:0
                });
                gsap.to(panelCloseRef.current, {
                    opacity: 0,
                });
            }
        },
        [panelOpen]
    );

    useGSAP(
        function () {
            if (vehiclePanel) {
                gsap.to(vehiclePanelRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(vehiclePanelRef.current, {
                    transform: "translateY(100%)",
                });
            }
        },
        [vehiclePanel]
    );

    useGSAP(
        function () {
            if (confirmRidePanel) {
                gsap.to(confirmRidePanelRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(confirmRidePanelRef.current, {
                    transform: "translateY(100%)",
                });
            }
        },
        [confirmRidePanel]
    );

    useGSAP(
        function () {
            if (vehicleFound) {
                gsap.to(vehicleFoundRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(vehicleFoundRef.current, {
                    transform: "translateY(100%)",
                });
            }
        },
        [vehicleFound]
    );

    useGSAP(
        function () {
            if (waitingForDriver) {
                gsap.to(waitingForDriverRef.current, {
                    transform: "translateY(0)",
                });
            } else {
                gsap.to(waitingForDriverRef.current, {
                    transform: "translateY(100%)",
                });
            }
        },
        [waitingForDriver]
    );

    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);

        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
            {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        setFare(response.data);
    }

    async function createRide() {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/create`,
            {
                pickup,
                destination,
                vehicleType,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    }

    return (
        <div className="h-screen relative overflow-hidden">
            <div className="w-50 ml-4 flex items-center absolute left-0 top-0 z-20">
                <Link to="/" className="flex items-center">
                    <img
                        src={lightninglogo}
                        alt="Swift Ride Logo"
                        className=" w-10 object-contain"
                    />
                    <img
                        src={swiftrideblack}
                        alt="Swift Ride Logo"
                        className=" w-28  object-contain"
                    />{" "}
                </Link>
            </div>
            <div className="h-screen w-screen">
                <LiveTracking />
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute opacity-0 right-6 top-6 text-2xl"
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form
                        className="relative py-3"
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}
                    >
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setPickup(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                            }}
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value);
                            }}
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                </div>
                <div ref={panelRef} className="bg-white h-0">
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>
            </div>
            <div
                ref={vehiclePanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
                <VehiclePanel
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>
            <div
                ref={confirmRidePanelRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
            >
                <ConfirmRide
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div
                ref={vehicleFoundRef}
                className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
            >
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>
            <div
                ref={waitingForDriverRef}
                className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
            >
                        <WaitingForDriver
                            ride={ride}
                            setVehicleFound={setVehicleFound}
                            setWaitingForDriver={setWaitingForDriver}
                            waitingForDriver={waitingForDriver} />            </div>
        </div>
    );
};

export default Home;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import lightninglogo from "../assets/lightninglogo.svg";
import swiftrideblack from "../assets/swiftrideblack.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const Captainlogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {captainData, setCaptain} = React.useContext(CaptainDataContext);
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password,
        };

        try{ const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/captains/login`,
            captain
        );

        if (response.status === 200) {
            const data = response.data;

            setCaptain(data.captain);
            localStorage.setItem("token", data.token);
            navigate("/captain-home");
        }
    }
        catch (error) {
            // show error message to user or log it
            alert(error.response?.data?.message || "Login failed. Please try again.");
            console.error("Login error:", error);
        }

        setEmail("");
        setPassword("");
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <div className="w-50 -ml-3 flex items-center">
                    <Link to="/" className="flex items-center">
                        <img
                            src={lightninglogo}
                            alt="logo"
                            className=" w-10 object-contain"
                        />

                        <img
                            src={swiftrideblack}
                            alt="swift Ride "
                            className=" pr-5 w-34 fill-current  text-black  object-contain"
                        />
                    </Link>
                </div>

                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-lg font-medium mb-2">
                        What's your email
                    </h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>

                    <input
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                        type="password"
                        placeholder="password"
                    />

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
                        Login
                    </button>
                </form>
                <p className="text-center">
                    Join a fleet?{" "}
                    <Link to="/captain-signup" className="text-blue-600">
                        Register as a Captain
                    </Link>
                </p>
            </div>
            <div>
                <Link
                    to="/login"
                    className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default Captainlogin;
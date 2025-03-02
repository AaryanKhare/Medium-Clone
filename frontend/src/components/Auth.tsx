import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../pages/config"; 
import axios from "axios";
import { SignupInput } from "@100xdevs/medium-common";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            // alert the user here
            alert("Error while signing up");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Signup" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div>
                {type === "signup" ?
                    <LabelledInput 
                        label="Name" 
                        placeholder="Aaryan Khare" 
                        onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                name: e.target.value
                            }));
                        }} 
                    /> : "" }
                    
                    <LabelledInput 
                        label="Username" 
                        placeholder="ak@gmail.com" 
                        type="email"
                        onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                username: e.target.value
                            }));
                        }} 
                    />
                    <LabelledInput 
                        label="Password" 
                        type="password" 
                        placeholder="123456" 
                        onChange={(e) => {
                            setPostInputs((prev) => ({
                                ...prev,
                                password: e.target.value
                            }));
                        }} 
                    />
                    <button 
                        onClick={sendRequest} 
                        type="button" 
                        className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-black font-semibold pt-4">{label}</label>
            <input 
                onChange={onChange} 
                type={type || "text"} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder={placeholder} 
                required 
            />
        </div>
    );
}

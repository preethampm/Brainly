import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }
    return <div className="h-screen w-screen bg-gray-900 flex justify-center items-center text-white">
        <div className="bg-gray-800 text-white rounded-xl border border-gray-700 min-w-96 p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" type="password" />
            <div className="flex justify-center pt-6">
                <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
            </div>
            <p className="text-center mt-6 text-sm">
                Don't have an account? <Link to="/signup" className="text-purple-500 hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
}
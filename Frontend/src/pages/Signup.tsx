import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
            username,
            password
        })
        navigate("/signin")
        alert("You have signed up!")
    }

    return <div className="h-screen w-screen bg-gray-900 flex justify-center items-center text-white">
        <div className="bg-gray-800 text-white rounded-xl border border-gray-700 min-w-96 p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" type="password" />
            <div className="flex justify-center pt-6">
                <Button onClick={signup} loading={false} variant="primary" text="Sign Up" fullWidth={true} />
            </div>
            <p className="text-center mt-6 text-sm">
                Already have an account? <Link to="/signin" className="text-teal-500 hover:underline">Sign In</Link>
            </p>
        </div>
    </div>
}
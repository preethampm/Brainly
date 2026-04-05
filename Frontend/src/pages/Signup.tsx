import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signup() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        if (data.user) {
            alert("Check your email to confirm your account!");
            navigate("/signin");
        }
        setLoading(false);
    }

    async function signUpWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/dashboard",
            },
        });
        if (error) {
            alert(error.message);
        }
    }

    async function signUpWithGithub() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin + "/dashboard",
            },
        });
        if (error) {
            alert(error.message);
        }
    }

    return <div className="h-screen w-screen bg-gray-900 flex justify-center items-center text-white">
        <div className="bg-gray-800 text-white rounded-xl border border-gray-700 min-w-96 p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <Input reference={emailRef} placeholder="Email" />
            <Input reference={passwordRef} placeholder="Password" type="password" />
            <div className="flex justify-center pt-6">
                <Button onClick={signup} loading={loading} variant="primary" text="Sign Up" fullWidth={true} />
            </div>
            <div className="mt-4">
                <p className="text-center text-gray-400 mb-2">or continue with</p>
                <div className="flex gap-2 justify-center">
                    <Button onClick={signUpWithGoogle} loading={false} variant="secondary" text="Google" />
                    <Button onClick={signUpWithGithub} loading={false} variant="secondary" text="GitHub" />
                </div>
            </div>
            <p className="text-center mt-6 text-sm">
                Already have an account? <Link to="/signin" className="text-teal-500 hover:underline">Sign In</Link>
            </p>
        </div>
    </div>
}
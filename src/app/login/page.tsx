"use client";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast/headless";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            if(error instanceof AxiosError){
                console.log("Login failed", error.response!.data.message);
                toast.error(error.message);
            }
            console.log("Login failed", error);
            toast.error(error);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);


    return (
        <div className="dark:text-white flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input 
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text" id="email" 
                value={user.email} 
                onChange={e=>setUser({...user, email: e.target.value})}
                placeholder="email"/>
            
            <label htmlFor="password">password</label>
            <input 
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password" id="password" 
                value={user.password} 
                onChange={e=>setUser({...user, password: e.target.value})}
                placeholder="password"/>

            <button
                disabled={buttonDisabled}
                onClick={onLogin}
                className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-slate-400"
            >Login Here</button>
            <label>Don't have an account? <Link href="/signup">Signup</Link></label>
        </div>
    )
    
}
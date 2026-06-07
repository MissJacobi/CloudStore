import { form } from "framer-motion/client";
import React, {useState}from "react";


const AuthModal = ({isOpen, onClose, onLoginSuccess}) => {
    const [authMode, setAuthMode] = useState('login');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    if (!isOpen) return null;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_API_URL;

        const url = authMode === "login"
        ?`${baseUrl}/auth/login`
        : `${baseUrl}/users/register`;

        const bodyData = authMode === "login"
        ? {email: formData.email, password: formData.password}
        : {firstname: formData.firstName, lastname: formData.lastName, email: formData.email, password: formData.password};

        try {
            const response = await fetch(url,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if(response.ok){
                const data = await response.json();
                //Förväntas få data med all info

                if(authMode === 'login'){
                    if(onLoginSuccess){
                        //skickar både data och token
                        onLoginSuccess(data.user, data.token);
                    }
                    onClose();
                } else {
                    alert("Account created successfully! Plese log in.")
                    setAuthMode("login");
                }
            }else {
                const errorText = await response.text();
                alert(`Authentication faild: ${errorText || 'Check your credentials'}`);
            }
        } catch (error){
            console.error("Connection problem to beckend:", error);
            alert("Could not connect to the cosmic server. Is your backend running?")
        }
    };

    return(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>

            <div className="relative w-full max-w-md bg-[#050505]/80 backdrop-blur-2xl border border-[#d4af37]/30 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,1)] transition-all">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                    x
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-white mb-2 italic">
                        {authMode === 'login' ? 'Welcome Back' : 'Join the Orbit'}
                    </h2>
                    <p className="text-[#d4af37]/60 text-[10px] uppercase tracking-[0.3rem]">
                    {authMode === 'login' ? 'Enter the nebula' : 'Start your celestial journey'}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {authMode === 'signup' && (
                        <div className="flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex-1">
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">First name</label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[#d4af37]/50"
                                    placeholder="Cassiopeia"
                                
                                    />
                            </div>

                            <div className="flex-1">
                                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">Last name</label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[#d4af37]/50"
                                    placeholder="Stars"
                                    
                                    />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[#d4af37]/50"
                            placeholder="cassiopeia-star@galaxy.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[#d4af37]/50"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#d4af37] text-black font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-[#f3e5ab] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] mt-4">
                        {authMode === 'login' ? 'Login to Orbit' : 'Create Access Key'}
                    </button>
                    <div className="mt-8 text-center text-[11px] tracking-wide text-gray-500">
                        {authMode == 'login' ? (
                            <p>New explorer? <span onClick={() => setAuthMode('signup')} className="text-[#d4af37] cursor-pointer hover:underline"> Create an account</span> </p>
                        ) : (
                            <p>Alreday an explorer? <span onClick={() => setAuthMode('login')} className="text-[#d4af37] cursor-pointer hover:underline">Login here</span></p>
                        )}
                    </div>

                </form>
            </div>
        </div>    

    );
};

export default AuthModal;

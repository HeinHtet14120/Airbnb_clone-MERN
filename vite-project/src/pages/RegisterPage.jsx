import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try{
            await axios.post('/register',{
                name : name,
                email : email,
                password : password
            });

            alert('Registeration Successful')
        }catch(e){
            alert('Registeration Failed. Try again later')
            
        }
        
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className=" mb-64">
            <h1 className=" text-3xl text-center mb-4">Register</h1>
            <form className=" max-w-md mx-auto" onSubmit={registerUser}>
                <input type="text" 
                       placeholder="Hein Htet" 
                       value={name} 
                       onChange={e => setName(e.target.value)}></input>
                <input type="email" 
                       placeholder="your@email.com" 
                       value={email} 
                       onChange={e => setEmail(e.target.value)}></input>
                <input type="password" 
                       placeholder="password" 
                       value={password} 
                       onChange={e => setPassword(e.target.value)}></input>
                <button className="primary">Register</button>
                <div className=" text-center py-2 text-gray-500">
                    Already a member? <Link className=" underline text-black" to={'/login'}>Login</Link>
                </div>
            </form>
            </div>
            
        </div>
    )
}
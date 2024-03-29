import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [redirect, setReditect] = useState(false);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/login', {email, password});
      setUser(data);
      alert('Login successful');
      navigate('/');
    } catch (e) {
      alert('Login failed');
    }
  }

  // if(redirect) {
  //   return <Navigate to={'/'} />
  // }

  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="primary mt-1">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline" to={'/register'}>Register now</Link>
                </div>
            </form>
        </div>
        
    </div>
  );
}

export default LoginPage

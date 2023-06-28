import axios from "axios";
import { useContext } from "react"
import { UserContext } from "../userContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function AccountPage() {
    const {ready, user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    async function logout () {
        await axios.post('/logout');
        navigate('/');    
        setUser(null);
     }

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!ready) {
        return 'Loading';
    }

    if (ready && !user && !navigate) {
        return <Navigate to={'/login'} />
    }

    function linkClasses (type=null) {
        let classes = 'py-2 px-6';

        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }

        return classes;
    }

    
    

    return (
        <div>
            <nav className="w-full flex mt-8 justify-center gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-4">Logout</button>
                </div>
            )}
        </div>
    )
}

export default AccountPage

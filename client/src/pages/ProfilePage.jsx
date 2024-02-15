import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  async function logout() {
    await axios.post("/api/logout");
    navigate("/");
    setUser(null);
  }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading";
  }

  if (ready && !user && !navigate) {
    return <Navigate to={"/login"} />;
  }

  if (!user) {
    alert('You are not logged in. Please log in.');
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

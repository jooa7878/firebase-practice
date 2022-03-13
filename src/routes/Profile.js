import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService } from "../fb";

function Profile() {
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
}

export default Profile;

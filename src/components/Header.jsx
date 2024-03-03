import { useProfile } from "../contexts/Profile.Context";
import Logout from "./Logout";

export const Header = () => {
  const { profile } = useProfile();
  const userEmail = profile?.email

  return (
    <div className="header">
      <h4 style={{ paddingLeft: "50px" }}>Employee Leave Management System</h4>
      {userEmail && (<div className='sub-header'>
      <span>{userEmail}</span>
      <Logout />
    </div>)}
    </div>

  );
};

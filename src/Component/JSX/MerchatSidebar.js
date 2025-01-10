import "../CSS/Sidebar.css";
import { AccountCircleRounded, AttachMoneyRounded, BarChartRounded, DashboardRounded, LogoutRounded  } from '@mui/icons-material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import CategoryIcon from '@mui/icons-material/Category';

import logo from '../Images/IMG_3028.JPG'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MerchatSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <div className="sidebar_container">
        {/* sidebar div */}
        <div className="sidebar">
          {/* profile */}
          <div className="profile">
          <NavLink to='/'>
            <img className="Logo"
              src="https://media.kasperskydaily.com/wp-content/uploads/sites/85/2023/06/23014456/top-eight-crypto-scams-2023-featured.jpg"
              alt="profile_img"
            />
            </NavLink>
          </div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <NavLink to='/MerchatDashboard' className='nav-links'>
                <DashboardRounded className="icon" style={{ color: 'white' }} /> <span>Dashboard
                </span>            </NavLink>
              <NavLink to='/GetApikey' className='nav-links'>
                <BarChartRounded className="icon" style={{ color: 'white' }} /> <span>Api Key</span>
              </NavLink>
              <NavLink to='/PaymentLinkGenerator' className='nav-links'>
                <InventoryIcon className="icon" style={{ color: 'white' }} /> <span> Payment Link </span>
              </NavLink>
              <NavLink to='/DonationNavigation' className='nav-links'>
                <HistoryIcon className="icon" style={{ color: 'white' }} /> <span>Donation Link</span>
              </NavLink>
              <div 
                className='nav-links' 
                onClick={handleLogout}
                style={{ 
                  marginTop: '20px',
                  cursor: 'pointer',
                  color: '#FF5757',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 87, 87, 0.1)'
                  }
                }}
              >
                <LogoutRounded className="icon" style={{ color: '#FF5757' }} /> 
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MerchatSidebar;
import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/firebaseContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Header() {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  // console.log(user,'dffdfd')

  async function HandleLogout() {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.log('Logout failed:', error)
    }
  }
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>navigate('/login')}>{user?.displayName?user.displayName:'Login'}</span>
          <hr />
        </div>
       {user&& <span onClick={HandleLogout}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={()=>navigate('/create')} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

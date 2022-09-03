import React from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {auth} from "./firebase";


const Header = () =>  {

const navigate = useNavigate()

    const clickToCheckout = () => {
      navigate('/checkout')
    }


    const basket = useSelector(state => state?.productReducer?.basket)
    const userEmail = useSelector(state => state?.productReducer?.user)

    const cartQuantity = basket?.length

    const handleAuth = () => {
    if (userEmail) {
        auth.signOut();
    }
    }



    return (
        <div className="header">
            <Link to='/'>
                <img
                    className="header_logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>


            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <Link to={!userEmail && '/login'}>
                    <div
                        onClick={handleAuth}
                        className="header_option">
                        <span className="header_optionLineOne">Hello {userEmail ?  `${userEmail.email}` : 'Guest'}</span>
                        <span className="header_optionLineTwo">{userEmail  ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>


                <Link to='/orders'>
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>


                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>


                    <div className="header_optionBasket" onClick={clickToCheckout}>
                        <ShoppingBasketIcon/>
                        <span className="header_optionLineTwo header__basketCount">
                            {cartQuantity}
                        </span>
                    </div>








            </div>
        </div>
    );
}

export default Header;
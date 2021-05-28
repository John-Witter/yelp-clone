import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import RestaurantSearch from '../RestaurantSearch'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks
    if (sessionUser) {
        sessionLinks = 
            <ProfileButton user={sessionUser} />
    } else {
        sessionLinks = (
            <>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        )
    }

    return (
        <ul className='nav-body'>
            <NavLink exact to='/'>
                Home
            </NavLink>

            {isLoaded && sessionLinks}
            <RestaurantSearch />
        </ul>
        
    )
}

export default Navigation
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RestaurantSearch from '../RestaurantSearch'
import * as sessionActions from '../../store/session';
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const logout = (e) => {
        dispatch(sessionActions.logout());
    };

    return (
        <ul className='nav-body'>
            <NavLink exact to='/' className='title'>
                <div className='title'>Yelp Jr.</div>
            </NavLink>
            {!sessionUser && (<NavLink className='link' to='/login'>Log In</NavLink>)}
            {!sessionUser && <NavLink className='link' to='/signup'>Sign Up</NavLink>}
            
            <RestaurantSearch />
            {isLoaded && (
                <div className='logout' onClick={logout}>Log Out</div>
            )}
        </ul>

    )
}

export default Navigation
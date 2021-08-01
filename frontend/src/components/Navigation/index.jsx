import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import RestaurantSearch from '../RestaurantSearch'
import * as sessionActions from '../../store/session';
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    const demoUser = () => {
        let credential = 'demo@user.io'
        let password = 'password'
        dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                await res.json()
            })
    }

    const logout = (e) => {
        // const searchObj = { 'searchTerm': 'restaurants', "location": 'manhattan' }
        // window.localStorage.setItem('searchObj', JSON.stringify(searchObj))
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <ul className='nav-body'>
            <NavLink exact to='/' className='title'>
                <div className='title'>Yelp Jr.</div>
            </NavLink>
            <RestaurantSearch className='search' />
            {!sessionUser && <div className='link-parent'>
                <NavLink className='login' to='/login'>Log In</NavLink>
                <NavLink className='signup' to='/signup'>Sign Up</NavLink>
                <div className='demo' onClick={demoUser}>
                    Demo
                </div>
            </div>}
            {sessionUser && (
                <div className='logout' onClick={logout}>Log Out</div>
            )}
            {/* {!sessionUser && } */}
        </ul>

    )
}

export default Navigation
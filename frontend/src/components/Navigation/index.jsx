import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import RestaurantSearch from "../RestaurantSearch";
import { Event } from "../GoogleAnalytics/GoogleAnalytics";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch();
    // const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    const demoUser = () => {
        Event("DEMO EVENT", "Link to demo clicked", "NAV_BAR");

        let credential = "demo@user.io";
        let password = "password";
        dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                await res.json();
            }
        );
    };

    const logout = (e) => {
        // const searchObj = { 'searchTerm': 'restaurants', "location": 'manhattan' }
        // window.localStorage.setItem('searchObj', JSON.stringify(searchObj))
        Event("LOGOUT EVENT", "Link to logout clicked", "NAV_BAR");

        dispatch(sessionActions.logout());
    };

    return (
        <ul className="nav-body">
            <NavLink
                exact
                to="/"
                className="title"
                onClick={() => {
                    Event(
                        "HOMEPAGE EVENT",
                        "Link to homepage clicked",
                        "NAV_BAR"
                    );
                }}
            >
                <div className="title">Yelp Jr.</div>
            </NavLink>
            <RestaurantSearch className="search" />
            {!sessionUser && (
                <div className="link-parent">
                    <NavLink
                        className="login"
                        to="/login"
                        onClick={() => {
                            Event(
                                "LOGIN EVENT",
                                "Link to login clicked",
                                "NAV_BAR"
                            );
                        }}
                    >
                        Log In
                    </NavLink>
                    <NavLink
                        className="signup"
                        to="/signup"
                        onClick={() => {
                            Event(
                                "SIGNUP EVENT",
                                "Link to signup clicked",
                                "NAV_BAR"
                            );
                        }}
                    >
                        Sign Up
                    </NavLink>
                    <div className="demo" onClick={demoUser}>
                        Demo
                    </div>
                </div>
            )}
            {sessionUser && (
                <div className="logout" onClick={logout}>
                    Log Out
                </div>
            )}
            {/* {!sessionUser && } */}
        </ul>
    );
};

export default Navigation;

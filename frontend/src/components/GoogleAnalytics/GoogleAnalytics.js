// Google Analytics
// Initialize ReactGA with standardImplementation: true option.
// https://www.npmjs.com/package/react-ga?activeTab=readme
// https://malith-dev.medium.com/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8

import ReactGA from "react-ga";

// method to inititialize ReactGA
export const initGA = (trackingID) => {
    ReactGA.initialize("UA-213353187-2");
};

// Page View
export const PageView = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
};

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};

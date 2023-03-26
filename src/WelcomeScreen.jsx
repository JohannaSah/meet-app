import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ? (
        <div className="WelcomeScreen">
            <h1 className="title">Welcome to the Meet app</h1>
            <h4 className="subtext">
                Log in to see upcoming events around the world for full-stack developers
            </h4>
            <div className="meet-app-logo-wrapper">
                    <img className="meet-app-logo" src="../img/Meet.jpg" alt="meet app logo" />
                </div>
            <div className="button_cont" align="center">
                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in" />
                    </div>
                    <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" class="btn-text">
                        <b>Sign in with google</b>
                    </button>
                </div>
            </div>
            <a href="https://johannasah.github.io/meet-app/privacy.html" rel="nofollow noopener">
                Privacy policy
            </a>
        </div>
    ) : null;
}

export default WelcomeScreen;

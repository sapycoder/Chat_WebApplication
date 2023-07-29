import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
    const [{}, dispatch] = useStateValue();         //DISPATCH--- SHOOTS DATA WHENEVER GETS DATA
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result ) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login_container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="">
                </img>

                <div className="login_heading">
                    <h4>Sign In To WhatsApp Clone</h4>
                </div>
                <Button
                    type="submit"
                    onClick={signIn}>
                    Sign In With Google
            </Button>
            </div>
        </div>
    )
}

export default Login

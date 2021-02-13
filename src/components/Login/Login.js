import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { facebookLogin, googleLoginWithPopUp, signOutFromSite, initializeFirebase, loginWithGithub, createUser, signInUserWithEmailAndPassword, resetPassword, deleteAccount } from './LoginManager';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email : '',
        error : '',
        password : '',
        success : false,       
        isSignedIn : false
    })

    initializeFirebase();

    // Google Pop Up Log in

    const handleGoogleLogin = () => {

        googleLoginWithPopUp()
        .then( res => {
            setLoggedInUser(res);
            setUser(res);
        })
    }

    // Google Google Pop Up Log Out

    const handleSignOut = () => {
        signOutFromSite()
        .then( res => {
            setLoggedInUser(res);
            setUser(res);
            // console.log(res);
        })
    }


    const handleFacebookLogin = () => {
        facebookLogin()
        .then( res => {
            setLoggedInUser(res);
            setUser(res);
        })
    }

    const handleGithubLogin = () => {
        loginWithGithub()
        .then( res => {
            // setLoggedInUser(res);
            // console.log(res);
        })
    }

    const handleBlur = (event) => {
        let formValid = true;
        if(event.target.name === 'email'){
            formValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        else if(event.target.name === 'password'){
            const passwordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            formValid = passwordValid && passwordHasNumber;
        }
        if(formValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if(newUser && user.email && user.password) {
            createUser(user.name, user.email, user.password)
            .then( res => {
                setLoggedInUser(res);
                setUser(res);
            })
        }
        else if(!newUser && user.email && user.password) {
            signInUserWithEmailAndPassword(user.email, user.password)
            .then( res => {
                setLoggedInUser(res);
                setUser(res);
            })
        }

        event.preventDefault();
    }

    const handleResetPassword = (email) => {
        resetPassword(email);
    }

    const handleDeleteAccount = () => {
        deleteAccount();
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>           
            
            <div align="center" className="w-100" style={{maxWidth: '400px'}}>

                {
                    loggedInUser.email ?
                    <Button className='mb-3' variant='outline-success' onClick={handleSignOut}>Sign Out</Button> :
                    <Button variant='outline-success' onClick={handleGoogleLogin}>Google Sign In</Button>
                }

                &nbsp; &nbsp; &nbsp;

                {
                    loggedInUser.email ?
                    <Button className='mb-3' variant='outline-success' onClick={handleSignOut}>Log Out</Button> :
                    <Button variant='outline-success' onClick={handleFacebookLogin}>Login With Facebook</Button>
                }

                &nbsp; &nbsp; &nbsp;
                {
                    loggedInUser.email ?
                    <Button className='mb-3' variant='outline-success' onClick={handleSignOut}>Log Out</Button> :
                    <Button className='my-3' variant='outline-success' onClick={handleGithubLogin}>Github Login</Button>
                }

            <Card>
                <Card.Body>
                <Form onSubmit={handleSubmit}>
                    
                    {
                        newUser && <Form.Group id="name">
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter your name" ref={nameRef} required name="name" onBlur={handleBlur}/>
                        </Form.Group>
                    }

                    <Form.Group id="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" ref={emailRef} required name="email" onBlur={handleBlur}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" ref={passwordRef} required name="password" onBlur={handleBlur}/>
                    </Form.Group>


                    <Button variant="primary" type="submit" className='w-100'>
                        {
                            newUser ? 'Sign Up' : 'Sign In'
                        }
                    </Button>
                </Form>
                </Card.Body>
            </Card>

            <div className="text-center mb-4">
                Do You Have An Account? <span style={{cursor: 'pointer', color: 'green'}} onClick={() => setNewUser(!newUser)}> {newUser ? 'Sign In' : 'Sign Up'} </span> 
                <br/>
                <span style={{cursor: 'pointer', color: 'red'}} onClick={() => {handleResetPassword(user.email)}}>Forger Password or Reset Password</span> 
               <br/>
                {
                    loggedInUser.email && <span style={{cursor: 'pointer',}} className="text-danger" onClick={handleDeleteAccount}>Delete Account</span>
                }
            </div>   
 
            </div>
        </Container>
    );
};

export default Login;
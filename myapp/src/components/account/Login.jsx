import {TextField,Box,Button,styled,Typography} from '@mui/material';

import { useState,useContext } from 'react';

import {API} from '../../service/api';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    width:400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top:100px

`
const Wrapper = styled(Box)`
    padding:25px 35px;
    display:flex;
    flex :1;
    flex-direction: column;
    & > div, &> button,& > p{
        margin-top: 20px;

    }

`
const Loginbutton = styled (Button)`
    text-transform:none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius:2px;
`

const Signupbutton = styled (Button)`
    text-transform:none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius:2px;
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    email: '',
    password: '',
};



const Login = ({isUserAuthenticated}) => {
    


    const[account, toggleAccount ]= useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);


    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        else{
            setError('Something went try please try again')
        }
    }
    

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({  email: response.data.email ,name: response.data.name});
            
             isUserAuthenticated(true)
            setLogin(loginInitialValues);
             navigate('/');
        } else {
            setError('Something went wrong! please try again later');
        }
    }

    return(
        <Component>
            <Box>
            <Typography style={{textAlign:"center",}}>Login</Typography>
                {
                    account === 'login' ? 
                    <Wrapper>
                            <TextField variant="standard" value={login.email} onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                        <Loginbutton variant='contained' onClick={()=>loginUser()}>Login</Loginbutton>
                        <Typography style={{textAlign:"center"}}>Or</Typography>
                        <Signupbutton onClick ={()=> toggleSignup()}>Create a account</Signupbutton>
                    </Wrapper>
                :
                    <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />   

                            {error && <Error>{error}</Error>}                     
                            <Signupbutton onClick={() => signupUser()}>Sign up</Signupbutton>
                        <Typography style={{textAlign:"center"}}>Or</Typography>
                        <Loginbutton variant='contained' onClick={()=> toggleSignup()}>Already have a account</Loginbutton>
                    </Wrapper>
                }
            </Box> 
    </Component>
    )
}

export default Login;
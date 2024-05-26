import { useState } from "react";


import { FormGroup, FormControl, InputLabel,Input, Typography, styled, Button } from "@mui/material";

import { addAsset } from "../service/api";
import { useNavigate } from "react-router-dom";



const Container = styled(FormGroup)`
    width:50%;
    margin: 5% auto 0 auto;
    & > div {
        margin-top: 20px;
    }

`

const defaultValue ={
    AssetID: '',
    Name: '',
    AssetType: '',
    Description: '',
    YearofConstruction: '',
    Capacity: '',
    NumRooms: '',
    MaintanceReq: '',
    Owner: '',
}





const Addassets = ()=>{


    const [user,setUser]= useState(defaultValue);
    const navigate = useNavigate();

    const onValueChange = (e) =>{
        console.log(e.target.name,e.target.value)
        setUser({...user,[e.target.name]: e.target.value})
        console.log(user);
    }

    const addAssetDetail =async () =>{
        await addAsset(user);
        navigate ('/');
    }
    return (
        <Container>
            <Typography variant="h4">Add Asset</Typography>
            <FormControl>
                <InputLabel>Asset ID</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="AssetID"/>
            </FormControl>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="Name"/>
            </FormControl>
            <FormControl>
                <InputLabel>Asset Type</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="AssetType"/>
            </FormControl>
            <FormControl>
                <InputLabel>Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="Description"/>
            </FormControl>
            <FormControl>
                <InputLabel>Year Of Construction</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="YearofConstruction"/>
            </FormControl>
            <FormControl>
                <InputLabel>Capacity</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="Capacity"/>
            </FormControl>
            <FormControl>
                <InputLabel>Num Rooms</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="NumRooms"/>
            </FormControl>
            <FormControl>
                <InputLabel>Maintenance Required</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="MaintanceReq"/>
            </FormControl>
            <FormControl>
                <InputLabel>Owner</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="Owner"/>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={()=> addAssetDetail()}>Submit</Button>
            </FormControl>
        </Container> 
    )
}
export default Addassets;
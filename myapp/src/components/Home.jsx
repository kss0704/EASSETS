import { useEffect, useState } from "react";

import { Table, TableRow, TableBody, TableCell, TableHead, styled, Button } from "@mui/material";


import { getAssets , deleteAsset } from '../service/api';

import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
    
    margin: 50px auto 0 auto
`
const Thead = styled(TableRow)`
    background : black;
    & > th{
        color:white;
        font-size: 20px
    }
`
const TBody = styled(TableRow)`
    & > td{
        font-size:15px;
        
    }
`

const Home = ()=>{

    const [users,setUsers] = useState([]);

    useEffect (()=>{
        getAllAssets();
    },[]);

    const getAllAssets = async () =>{ 
        try{
            let res = await getAssets();
            setUsers(res.data);
        }
        catch(error)
        {
            console.log("Error to get assets");
        }

    }

    const deleteAssetDetails = async(id) => {
        await deleteAsset(id);
        getAllAssets();
    }
    
    return (
        <StyledTable>
            <TableHead>
                <Thead>
                    
                    <TableCell>Asset ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Asset Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Year Of Construction</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Number of Rooms</TableCell>
                    <TableCell>Maintenace Required</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell></TableCell>
                </Thead>
            </TableHead>
            <TableBody>
                {
                    users.map(user =>(
                        <TBody key ={user._id}>
                            <TableCell>{user.AssetID}</TableCell>
                            <TableCell>{user.Name}</TableCell>
                            <TableCell>{user.AssetType}</TableCell>
                            <TableCell>{user.Description}</TableCell>
                            <TableCell>{user.YearofConstruction}</TableCell>
                            <TableCell>{user.Capacity}</TableCell>
                            <TableCell>{user.NumRooms}</TableCell>
                            <TableCell>{user.MaintanceReq}</TableCell>
                            <TableCell>{user.Owner}</TableCell>
                            <TableCell>
                                <Button variant="contained" style={{marginRight:10}} component={Link}  to={`/edit/${user._id}`}>Edit</Button>
                                <Button variant="contained" color="secondary" onClick={() => deleteAssetDetails(user._id)}>Delete</Button>
                            </TableCell>
                        </TBody>
                    ))
                }
            </TableBody>
        </StyledTable>
    )
}

export default Home;
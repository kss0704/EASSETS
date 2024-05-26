/*import { AppBar, Toolbar, styled } from '@mui/material';
import { Link } from 'react-router-dom';




const Header = styled(AppBar)`
    background: #111111
`;

const Tabs = styled(Link)`
    font-size: 20px;
    margin-right: 20px;
    color: inherit;
    text-decoration: none
`;
const Lo = styled(Link)`
    margin-left:1230px;
    color: inherit;
    text-decoration: none;
    font-size: 20px;
`



const NavBar = ()=>{
    return(
        <Header position='static'>
            <Toolbar>
                <Tabs to='/'>Home</Tabs>
                <Tabs to ='add'>Add Asset</Tabs>
                <Tabs to ='/login'>Log Out</Tabs>
            </Toolbar>
        </Header>
    )
}


export default NavBar;*/
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">E-Assets</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Asset</Nav.Link>
            <Nav.Link href ='/login'>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
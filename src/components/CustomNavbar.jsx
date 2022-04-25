import { Navbar, Nav } from 'react-bootstrap'

const CustomNavbar = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      {props.title} - {props.payoff}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#pricing">Menu</Nav.Link>
        <Nav.Link href="#features">Reservations</Nav.Link>
        <Nav.Link href="#deets">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default CustomNavbar

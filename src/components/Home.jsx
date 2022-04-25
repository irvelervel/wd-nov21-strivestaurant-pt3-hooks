// I will put the carousel here, surrounded by some layout bootstrap component
import { useState } from 'react'
import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import dishes from '../data/menu.json'
import ReservationForm from './ReservationForm'
import Reservations from './Reservations'

// what is the STATE in a react component?
// a state is an object that can be defined in react Class components
// a state is a place for remembering things over time
// this object is available JUST in this component, encapsulated in the component
// even more, it is READ-ONLY

const Home = () => {
  // the state object must be created between the opening of the class
  // and the render() method
  // every time you refresh the page, the state resets

  // state = {
  //   selectedPasta: null,
  //   // selectedPasta is null initially, but eventually when I click on a slide
  //   // its value will become the pasta object I clicked on
  //   // because it will REMEMBER the last pasta I clicked on
  // }

  const [selectedPasta, setSelectedPasta] = useState(null)

  return (
    <Container>
      {/* here I will create a new Row and in it I will place
        a Form component */}
      <Row className="justify-content-center my-4">
        <Col xs={12} md={6} className="text-center">
          <Reservations />
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col xs={12} md={6} className="text-center">
          <ReservationForm />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1>Welcome to Strivestaurant</h1>
          <p>We can only serve pasta!</p>
          {/* here let's put the carousel */}
          <Carousel>
            {dishes.map((dish) => (
              <Carousel.Item key={dish.id}>
                <img
                  className="d-block w-100"
                  src={dish.image}
                  alt="First slide"
                  onClick={() => {
                    console.log('pasta clicked')
                    // the state object is not directly writable
                    // I CANNOT DO THIS: this.state.selectedPasta = somethingelse
                    // DON'T DO THIS!

                    // do this instead:
                    // you have to use a function called setState
                    // setState is ALSO going to be found on "this"
                    // this.setState({
                    //   // the values you're going to pass here
                    //   // are going to be MERGED with the state object
                    //   selectedPasta: dish, // we want here the pasta we clicked on
                    // })
                    setSelectedPasta(dish)
                  }}
                />
                <Carousel.Caption>
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      {/* let's finish this up creating a dynamic list of comments */}
      {/* about the current selectedPasta */}
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <ListGroup>
            {/* this is crashing because initially, in our state, */}
            {/* the value we assigned to selectedPasta is null */}
            {/* {this.state.selectedPasta &&
                //   this is called SHORT CIRCUIT OPERATOR &&
                // the block is valid if both of the ends on && are true
                this.state.selectedPasta.comments.map((review) => (
                  <ListGroup.Item key={review.id}>
                    {review.rating} | {review.comment}
                  </ListGroup.Item>
                ))} */}
            {selectedPasta ? (
              selectedPasta.comments.map((review) => (
                <ListGroup.Item key={review.id}>
                  {review.rating} | {review.comment}
                </ListGroup.Item>
              ))
            ) : (
              <div>Click on a pasta to show the reviews</div>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

// final consideration: the best practise in React is binding the JSX to the data
// you want to bind them together, and then forget about the JSX!
// at that point, your job becomes working with the props, the state, the data!

export default Home

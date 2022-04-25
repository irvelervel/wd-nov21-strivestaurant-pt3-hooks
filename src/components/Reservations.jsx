// this component is going to retrieve and list the existing reservations
// they are retrievable from 'https://striveschool-api.herokuapp.com/api/reservation'

// 1) we're going to create a state variable for the reservations that are going to come from the endpoint
// 2) then we're going to do the fetch() on the endpoint
// 3) we're going to save the result of the fetch() in the state variable
// 4) we bound our JSX to map the content of the state variable, initially we don't see any list item because the array is []
// 5) but when the fetch() finishes, because we're setting the state, render() fires again!
// 6) it will go over the entire JSX, this time finding that reservations in the state is NOT empty anymore!
// 7) and so the second invocation of render(), the one that happens because of our setState, generates the dynamic list items
// out of the reservations array

import { useState, useEffect } from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'

const Reservations = () => {
  // state = {
  //   reservations: [],
  //   isLoading: true,
  //   isError: false,
  // }

  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // componentDidMount = () => {
  //   // what is this?
  //   // componentDidMount is another lifecycle method
  //   // just like render, it gets automatically called by React
  //   // - when? AFTER the INITIAL render()
  //   // - how many times? JUST ONCE!
  //   // well, this looks PERFECT for an async operation like a fetch!!
  //   console.log("I'm the componentDidMount method!")
  //   // this looks a little bit like window.onload
  //   // so we're doing our fetch() precisely here :)
  //   this.getReservations()
  // }

  useEffect(() => {
    console.log("I'm the componentDidMount method!")
    getReservations()
  }, [])

  const getReservations = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation'
      )
      if (response.ok) {
        // we know everything went well with our request
        console.log('response is', response) // we need to call .json() on it
        // let's grab the body and make it usable in JS
        let data = await response.json()
        console.log('data is', data)
        // this.setState({
        //   reservations: data,
        //   isLoading: false,
        // })
        setReservations(data)
        setIsLoading(false)
      } else {
        // here is when I contact the server, but I get an error back
        // alert('aww snap, an error happened')
        // this.setState({
        //   isLoading: false,
        //   isError: true,
        // })
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log(error)
      // this is for a more generic error, maybe an internet issue
      // this.setState({
      //   isLoading: false,
      //   isError: true,
      // })
      setIsLoading(false)
      setIsError(true)
    }
  }

  // render() is a LIFECYCLE METHOD
  // it's the first one a beginner comes in contact with

  // render() FIRES AGAIN every time the state changes OR the PROPS change!
  console.log("I'm the render method!")
  return (
    <>
      <h3>EXISTING RESERVATIONS</h3>
      {isLoading && (
        // the && makes the Spinner appear when isLoading is true
        <Spinner animation="border" variant="success" />
      )}
      {isError && <Alert variant="danger">Aww snap, we got an error 😣</Alert>}
      <ListGroup>
        {/* how many of these will be rendered just as the page loads? */}
        {reservations.map((reservation) => (
          <ListGroup.Item key={reservation._id}>
            {reservation.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Reservations

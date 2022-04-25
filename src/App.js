import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'

function App() {
  return (
    <div>
      <CustomNavbar
        title="Strivestaurant"
        payoff="Best Pasta on the Internet"
      />
      {/* passing different props you can dramatically change the content of a component */}
      {/* <CustomNavbar title="Strivify" payoff="The best music" /> */}
      <Home />
    </div>
  )
}

export default App

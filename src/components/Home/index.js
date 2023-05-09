import {Component} from 'react'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            width={500}
          />
        </div>
      </>
    )
  }
}

export default Home

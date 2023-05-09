import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const websiteLoginUrl =
  'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

class Login extends Component {
  state = {userId: '', userPin: '', showSubmitError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangeUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state
    return (
      <>
        <label className="label" htmlFor="userId">
          User ID
        </label>
        <br />
        <input
          className="input"
          id="userId"
          type="text"
          value={userId}
          onChange={this.onChangeUserId}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  renderUserPin = () => {
    const {userPin} = this.state
    return (
      <>
        <label className="label" htmlFor="userPin">
          User PIN
        </label>
        <br />
        <input
          className="input"
          id="userPin"
          type="password"
          value={userPin}
          onChange={this.onChangeUserPin}
          placeholder="Enter PIN"
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="content_container">
          <img
            className="website_image"
            src={websiteLoginUrl}
            alt="website login"
          />
          <form className="form_container" onSubmit={this.onSubmitLoginForm}>
            <h1 className="heading">Welcome Back!</h1>
            {this.renderUserId()}
            {this.renderUserPin()}
            <button className="login_button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

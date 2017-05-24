import React from 'react'

const host = "http://localhost:7777"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { userName: '', password: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const s = {}
    s[event.target.id] = event.target.value
    this.setState(s)
  }

  handleSubmit(event) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(e){
      if(xhr.readyState == 4){
        var res = xhr.response 
        console.log(`${xhr.state} ${xhr.status}`) 
      }
  }
    xhr.onload = function (e) {
      window.sessionStorage.accessToken = JSON.parse(xhr.response)
    }
    xhr.open("POST", `${host}/login`)
    var user = this.state
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(user))
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input className="form-control" type="text" id="userName" value={this.state.userName} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default Login
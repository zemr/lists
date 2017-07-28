import React from 'react';
import { connect } from 'react-redux';
import { setRepository } from './reducer-repository';
import styled from 'styled-components';

const StyledHome = styled.div`
  max-width: 420px;
  padding: 20px 20px 25px;
  background-color: #c15347;
 
  @media (max-width: 649px) {
    margin-right: auto;
    margin-left: auto;
  }
  
  @media (min-width: 650px) {
    margin-top: 5px;
  }
`;

const HomeContent = styled.div`
  width: 100%;
  color: #fffcdd;
  
  > div:nth-child(1) {
    font-weight: bold;
  }
  
  input {
    background-color: #fffff2;
    font-size: 1em;
    color: #af4a41;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100px;
    margin-right: 2px;
    margin-left: 2px;
    border: 0;
    outline: 0;
  }
  
  input[type="submit"] {
    padding: 4px 6px;
    margin-top: 10px;
    margin-left: 10px;
    font-size: .9em; 
    border: 2px solid #fffff2;
    background-color: #c15347;
    color: #fffff2;
    outline: 0;
    
    &:hover {
      background-color: #aa483f;
    }
  }
`;

const Details = styled.div`
  margin-top: 1em;
  font-size: 0.9em;
    
  div {
    margin: 4px 8px;
  }

`;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      repo: '',
      login: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    const url = 'https://api.github.com/repos/' + this.state.owner + '/' + this.state.repo + '/';
    const auth = btoa(this.state.login + ':' + this.state.password);
    event.preventDefault();
    this.props.setRepository(url, auth);
  }

  render() {
    return (
      <StyledHome>
        <HomeContent>
          <div>Repository Data</div>

          <Details>
            Default repository: <i>github.com/reactjs/react-redux</i>
          </Details>

          <Details>
            Provide another repository:
            <form onSubmit={this.handleSubmit}>
              <div>
                <i>https://github.com/</i>
                <input
                  type="text"
                  name="owner"
                  value={this.state.owner}
                  onChange={this.handleChange}
                  aria-label="repository owner"
                  aria-required="true"
                  required
                />
                /
                <input
                  type="text"
                  name="repo"
                  value={this.state.repo}
                  onChange={this.handleChange}
                  aria-label="repository name"
                  aria-required="true"
                  required
                />
              </div>

              <label>
                <div>Your GitHub username and password:
                  <br />
                  <input
                    type="text"
                    name="login"
                    value={this.state.login}
                    onChange={this.handleChange}
                    aria-label="login"
                    aria-required="true"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    aria-label="password"
                    aria-required="true"
                    required
                  />
                </div>
              </label>

              <input type="submit" value="Set repository"/>
            </form>
          </Details>
        </HomeContent>
      </StyledHome>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    setRepository: (url, auth) => dispatch(setRepository(url, auth))
  })
)(Home)

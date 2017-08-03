import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRepository } from './reducer-repository';
import styled from 'styled-components';
import { homePalette } from '../utils/colors';

const StyledHome = styled.div`
  max-width: 420px;
  padding: 20px 20px 25px;
  background-color: ${homePalette.redA};
 
  @media (max-width: 649px) {
    margin-right: auto;
    margin-left: auto;
  }
  
  @media (min-width: 650px) {
    margin-top: 5px;
    margin-left: 5px;
  }
`;

const HomeContent = styled.div`
  width: 100%;
  color: ${homePalette.yellowA};
  
  > div:nth-child(1) {
    font-weight: bold;
  }
  
  > div:nth-child(2) {
    margin-top: 1em;
  }
  
  > div:nth-child(3) {
    margin-top: 1.5em;
  }
`;

const Details = styled.div`
  font-size: .9em;
  word-break: break-all;
      
  form {
    margin: .7em 8px 4px;
  }
  
  div {
    font-size: .9em;
  }
  
  div:nth-child(1) {
    line-height: 1.9;  

    @media (max-width: 650px) {
      margin-bottom: 4px;  
    }

    span {
      display: inline-block;
      margin-right: 4px;
      margin-left: 4px;
      font-style: italic;
    }
  }
  
  div:nth-child(2) span {  
    display: inline-block;
    margin-bottom: 8px;
  }
  
  input {
    background-color: ${homePalette.yellowB};
    color: ${homePalette.redB};
    font-size: 1em;    
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100px;
    border: 0;
    outline: 0;
    box-shadow: none;
  }
  
  input[name="owner"] {
    margin-left: 4px;    
  }
     
  input[type="password"] {
    margin-left: 6px;
  }
  
  input[type="submit"] {
    padding: 4px 6px;
    border: 2px solid ${homePalette.yellowB};
    margin-top: 1.4em;
    background-color: ${homePalette.redA};
    color: ${homePalette.yellowB};
    font-size: .9em;
    outline: 0;
    
    &:hover {
      background-color: ${homePalette.redC};
    }
  }
`;

const propTypes = {
  setRepository: PropTypes.func.isRequired
};

export class Home extends React.Component {
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
    const repo = 'https://github.com/' + this.state.owner + '/' + this.state.repo;
    const auth = btoa(this.state.login + ':' + this.state.password);
    event.preventDefault();
    this.props.setRepository(url, auth, repo);
    this.clearState();
  }

  clearState() {
    this.setState({ owner: '', repo: '', login: '', password: '' });
  }

  render() {
    return (
      <StyledHome>
        <HomeContent>
          <div>Repository Data</div>

          {
            this.props.repo.length === 0
              ?
              <Details>
                Default repository: <i>github.com/reactjs/react-redux</i>
              </Details>
              :
              <Details>
                Setted repository: <br />
                <i>{this.props.repo}</i>
              </Details>
          }

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
                <span>/</span>
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

                <div>
                  <span>Your GitHub username and password:</span>
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

              <input type="submit" value="Set repository"/>
            </form>
          </Details>
        </HomeContent>
      </StyledHome>
    )
  }
}

Home.propTypes = propTypes;

export default connect(
  state => ({
    repo: state.repository.repo
  }),
  dispatch => ({
    setRepository: (url, auth, repo) => dispatch(setRepository(url, auth, repo))
  })
)(Home)

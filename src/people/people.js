import React from 'react';
import { connect } from 'react-redux';

const People = ({ people }) => (
  <div>
    {
      people.length > 0
      ?
      people.map(person => (
        <div key={person.id}>{person.login}</div>
      ))
      : null
    }
  </div>
);

export default connect(
  state => ({
    people: state.people.data
  })
)(People)

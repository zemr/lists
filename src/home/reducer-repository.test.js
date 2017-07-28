import reducer, { setRepository } from './reducer-repository';

describe('reducer-repository', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual({ url: '', auth: '' })
  });

  it('sets fetching data', () => {
    expect(
      reducer(
        { url: '', auth: '' },
        setRepository('https://path/', 'abc')
      )
    ).toEqual(
      { url: 'https://path/', auth: 'abc' }
    )
  });

});

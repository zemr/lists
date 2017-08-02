import reducer, { setRepository } from '../reducer-repository';
import { rUrl } from '../../utils/test-helpers';

describe('reducer-repository', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual({ url: '', auth: '', repo: '' })
  });

  it('sets fetching data', () => {
    expect(
      reducer(
        { url: '', auth: '', repo: '' },
        setRepository(rUrl, 'abc', rUrl)
      )
    ).toEqual(
      { url: rUrl, auth: 'abc', repo: rUrl }
    )
  });

});

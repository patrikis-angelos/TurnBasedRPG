import leaderboards from '../Modules/leaderboards';
import MockScene from './sceneMock';
import 'regenerator-runtime/runtime';

let scene = MockScene();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      result: [
        {
          user: 'Patrick',
          score: 10
        },
        {
          user: 'Guest',
          score: 15
        }
      ]
    }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('loadScores', () => {
  it('loads the scores', async () => {
    const scores = await leaderboards.loadScores();
    expect(scores.result).toBeTruthy();
  });
});

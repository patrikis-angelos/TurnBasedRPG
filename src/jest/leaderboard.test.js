import leaderboards from '../Modules/leaderboards';
import 'regenerator-runtime/runtime';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    result: [
      {
        user: 'Patrick',
        score: 10,
      },
      {
        user: 'Guest',
        score: 15,
      },
    ],
  }),
}));

describe('loadScores', () => {
  it('loads the scores', async () => {
    const scores = await leaderboards.loadScores();
    expect(scores.result).toBeTruthy();
  });
});

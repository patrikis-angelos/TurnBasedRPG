import 'regenerator-runtime/runtime';

const leaderboards = (() => {
  const compare = (a, b) => {
    const scoreA = parseInt(a.score, 10);
    const scoreB = parseInt(b.score, 10);
    if (scoreA > scoreB) {
      return -1;
    } if (scoreA < scoreB) {
      return 1;
    }
    return 0;
  };

  const loadScores = async () => {
    try {
      const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores',
        { mode: 'cors' });
      return response.json();
    } catch (error) {
      return null;
    }
  };

  const saveScore = async (name, score) => {
    try {
      let submitted;
      submitted = $.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores', // eslint-disable-line
        {
          user: name,
          score,
        });
      return submitted;
    } catch (error) {
      return false;
    }
  };

  const displayScores = async (scene) => {
    try {
      const scores = await loadScores();
      const { result } = scores;
      result.sort(compare);
      const max = result.length > 15 ? 15 : result.length;
      for (let i = 0; i < max; i += 1) {
        const text = scene.add.text(20, 30 * i + 10, `${result[i].user}: ${result[i].score}`);
        text.setScale(1.5);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return { saveScore, displayScores, loadScores };
})();

export default leaderboards;
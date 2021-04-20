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

  async function loadScores() {
    try {
      const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores',
        { mode: 'cors' });
      return response.json();
    } catch (error) {
      return null;
    }
  }

  const saveScore = (name, score) => {
    $.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores', // eslint-disable-line
      {
        user: name,
        score,
      });
  };

  async function displayScores(scene) {
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
      return null;
    }
  }

  return { saveScore, displayScores, loadScores };
})();

export default leaderboards;
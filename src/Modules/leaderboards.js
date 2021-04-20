const leaderboards = (() => {

  const compare = (a, b) => {
    const scoreA = parseInt(a.score, 10);
    const scoreB = parseInt(b.score, 10);
    if (scoreA > scoreB) {
      return -1;
    } else if (scoreA < scoreB) {
      return 1;
    } else {
      return 0;
    }
  }

  async function loadScores() {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores', 
    {mode: 'cors'})
    return response.json();
  }

  const saveScore = (name, score) => {
    $.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WLIEGiwTvWu1lAF6DphM/scores',
    {
      user: name,
      score: score,
    });
  }

  async function displayScores(scene) {
    const scores = await loadScores();
    let result = scores.result;
    result.sort(compare);
    const max = result.length > 15 ? 15 : result.length;
    for (let i = 0; i < max; i += 1) {
      const text = scene.add.text(20, 30*i + 10, `${result[i].user}: ${result[i].score}`);
      text.setScale(1.5);
    }
  }

  return {saveScore, displayScores, loadScores}
})();

export default leaderboards;
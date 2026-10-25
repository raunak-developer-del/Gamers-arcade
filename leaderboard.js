
import { supabase } from './supabase.js';

const leaderboard = document.getElementById('leaderboard');

async function loadLeaderboard() {
  leaderboard.textContent = 'Loading scores...';

  const { data, error } = await supabase
    .from('arcade_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(50);

  if (error) {
    leaderboard.textContent =
      'Could not load scores: ' + error.message;
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    leaderboard.textContent = 'No scores yet. Be the first!';
    return;
  }

  leaderboard.replaceChildren();

  data.forEach((entry, index) => {
    const row = document.createElement('p');
    row.textContent =
      `${index + 1}. ${entry.username ?? 'Player'} — ${entry.score}`;
    leaderboard.appendChild(row);
  });
}

loadLeaderboard();

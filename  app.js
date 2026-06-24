const supabaseUrl = "https://ciibtvqgmptmcztwakns.supabase.co";

const supabaseKey = "YOUR_KEY";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

loadTeams();
loadMatches();
loadNews();

async function loadTeams() {

  const { data } = await supabase
    .from('teams')
    .select('*')
    .order('group_name');

  let html = '';

  data.forEach(team => {

    html += `
      <div class="card ${team.group_name === 'A' ? 'teamA' : 'teamB'}">
        <strong>${team.name}</strong>
        <br>
        المجموعة ${team.group_name}
      </div>
    `;

  });

  document.getElementById('teams').innerHTML = html;
}

async function loadMatches() {

  const { data } = await supabase
    .from('matches')
    .select('*')
    .order('match_date');

  let html = '';

  data.forEach(match => {

    html += `
      <div class="card">
        <strong>${match.home_team}</strong>
        ×
        <strong>${match.away_team}</strong>
        <br>
        ${match.match_date}
        <br>
        المجموعة ${match.group_name}
      </div>
    `;

  });

  document.getElementById('matches').innerHTML = html;
}

async function loadNews() {

  const { data } = await supabase
    .from('news')
    .select('*')
    .order('created_at',{ascending:false});

  let html = '';

  data.forEach(item => {

    html += `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.content || ''}</p>
      </div>
    `;

  });

  document.getElementById('news').innerHTML = html;
}
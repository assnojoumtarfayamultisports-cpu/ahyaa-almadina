alert("APP LOADED");

const supabaseUrl = "https://ciibtvqgmptmcztwakms.supabase.co";
const supabaseKey = "ضع هنا مفتاح anon public من Supabase";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function loadTeams() {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("*");

    if (error) throw error;

    let html = "";

    data.forEach(team => {
      html += `
        <div class="card">
          <strong>${team.name || "بدون اسم"}</strong>
          <br>
          المجموعة: ${team.group_name || "-"}
        </div>
      `;
    });

    document.getElementById("teams").innerHTML = html || "لا توجد فرق";
  } catch (err) {
    document.getElementById("teams").innerHTML =
      "خطأ: " + err.message;
  }
}

async function loadMatches() {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*");

    if (error) throw error;

    let html = "";

    data.forEach(match => {
      html += `
        <div class="card">
          <strong>${match.home_team}</strong>
          ×
          <strong>${match.away_team}</strong>
          <br>
          ${match.match_date || ""}
        </div>
      `;
    });

    document.getElementById("matches").innerHTML =
      html || "لا توجد مباريات";
  } catch (err) {
    document.getElementById("matches").innerHTML =
      "خطأ: " + err.message;
  }
}

async function loadNews() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*");

    if (error) throw error;

    let html = "";

    data.forEach(item => {
      html += `
        <div class="card">
          <strong>${item.title || "خبر"}</strong>
        </div>
      `;
    });

    document.getElementById("news").innerHTML =
      html || "لا توجد أخبار";
  } catch (err) {
    document.getElementById("news").innerHTML =
      "خطأ: " + err.message;
  }
}

loadTeams();
loadMatches();
loadNews();
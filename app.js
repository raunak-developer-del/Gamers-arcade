/* Gamers' Arcade — Phase 1 app and local player data */
(() => {
  const $ = id => document.getElementById(id);
  const STORE = "gamers_arcade_player_v1";
  const defaults = {name:"Player",xp:0,tokens:0,played:0,achievements:[],scores:[]};
  let player;
  try { player = {...defaults,...JSON.parse(localStorage.getItem(STORE)||"{}")}; }
  catch { player = {...defaults}; }
  const categories = [
    ["Action","🚀"],["Puzzle","🧩"],["Arcade","👾"],["Strategy","♞"],["Racing","🏁"],["Sports","⚽"],["Classic","🕹️"]
  ];
  let selectedCategory = "all";
  function save(){localStorage.setItem(STORE,JSON.stringify(player));renderPlayer()}
  function renderCategories(){
    const grid=$("categoryGrid"),filter=$("categoryFilter");
    grid.innerHTML="";
    categories.forEach(([name,icon])=>{
      const button=document.createElement("button");button.className="category-card"+(selectedCategory===name?" selected":"");
      button.innerHTML=`<span class="cat-icon">${icon}</span><span>${name}</span>`;
      button.addEventListener("click",()=>{selectedCategory=selectedCategory===name?"all":name;filter.value=selectedCategory;renderCategories();renderGames()});
      grid.append(button);
      const option=document.createElement("option");option.value=name;option.textContent=name;filter.append(option);
    });
  }
  function renderGames(){
    const query=($("librarySearch").value||$("searchInput").value).trim().toLowerCase();
    const category=$("categoryFilter").value;
    const list=(window.ARCADE_CATALOG||[]).filter(g=>(selectedCategory==="all"||g.category===selectedCategory)&&(category==="all"||g.category===category)&&(!query||(g.title+" "+g.description+" "+g.category).toLowerCase().includes(query)));
    $("gameGrid").innerHTML="";
    list.forEach(g=>{
      const card=document.createElement("article");card.className="game-card";
      card.innerHTML=`<span class="game-icon">${g.icon}</span><h3>${g.title}</h3><p>${g.description}</p><p class="game-meta">${g.category} · ${g.difficulty} · Variant ${g.variantNumber}/5</p><button type="button">Play game →</button>`;
      card.querySelector("button").addEventListener("click",()=>openGame(g));$("gameGrid").append(card);
    });
    $("gameCount").textContent=`${list.length} games shown · 500 total`;
    $("emptyState").hidden=list.length!==0;
  }
  function openGame(g){
    $("dialogTitle").textContent=g.title;$("dialogDescription").textContent=g.description;
    $("currentScore").textContent="0";$("bestScore").textContent=localStorage.getItem("ga_best_"+g.id)||"0";
    $("gameMessage").textContent="Press Start to play.";
    $("gameDialog").showModal();window.currentArcadeGame=g;
  }
  function renderPlayer(){
    $("xpCount").textContent=player.xp;$("tokenCount").textContent=player.tokens;
    $("profileXP").textContent=player.xp;$("profileTokens").textContent=player.tokens;
    $("playedCount").textContent=player.played;$("playerName").value=player.name;
    $("achievementCount").textContent=player.achievements.length;
    const list=$("achievementList");list.innerHTML="";
    const badges=[["First Steps","Play your first game","🎮",player.played>=1],["Getting Started","Earn 100 XP","⚡",player.xp>=100],["Arcade Regular","Play 10 games","🏆",player.played>=10]];
    badges.forEach(([title,desc,icon,done])=>{let row=document.createElement("div");row.className="achievement"+(done?"":" locked");row.innerHTML=`<span>${icon}</span><div><b>${title}</b><br><small>${desc} ${done?"· Unlocked":"· Locked"}</small></div>`;list.append(row)});
    $("leaderboardList").innerHTML=`<div class="leader-row"><span>1. ${escapeText(player.name)}</span><b>${player.xp} XP</b></div>`;
  }
  function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function recordRun(game,score){
    player.played++;player.xp+=Math.max(5,Math.floor(score/5));player.tokens+=Math.max(1,Math.floor(score/100));
    if(player.played>=1&&!player.achievements.includes("first"))player.achievements.push("first");
    save();
  }
  function bind(){
    $("searchInput").addEventListener("input",()=>{$("librarySearch").value=$("searchInput").value;renderGames();location.hash="games"});
    $("librarySearch").addEventListener("input",renderGames);
    $("categoryFilter").addEventListener("change",()=>{selectedCategory="all";renderCategories();renderGames()});
    $("saveProfile").addEventListener("click",()=>{player.name=$("playerName").value.trim().slice(0,20)||"Player";save()});
    $("closeGame").addEventListener("click",()=>{$("gameDialog").close();window.ArcadeEngine.stop()});
    $("gameDialog").addEventListener("click",e=>{if(e.target===$("gameDialog")){$("gameDialog").close();window.ArcadeEngine.stop()}});
    $("startGame").addEventListener("click",()=>{if(window.currentArcadeGame)window.ArcadeEngine.start(window.currentArcadeGame)});
    $("gameAction").addEventListener("click",()=>{document.dispatchEvent(new KeyboardEvent("keydown",{key:" "}))});
  }
  window.ArcadeApp={recordRun};
  document.addEventListener("DOMContentLoaded",()=>{renderCategories();renderGames();renderPlayer();bind()});
})();
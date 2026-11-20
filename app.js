/* Gamers' Arcade — Phase 3 online-ready app */
(() => {
  const $ = id => document.getElementById(id);
  const STORE = "gamers_arcade_player_v1";
  const SUPABASE_URL = "https://zvfxbbsucbuvlmggkhgu.supabase.co";
  // Replace this placeholder with the project's sb_publishable_ key.
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_otXlcqkiRXK344Nosn7ufQ_c90bMTGH";
  const defaults = {name:"Player",xp:0,tokens:0,played:0,achievements:[],scores:[]};
  let player, supabase = null, currentUser = null, onlineReady = false, boardMode = "global", realtimeChannel = null;
  try { player = {...defaults,...JSON.parse(localStorage.getItem(STORE)||"{}")}; } catch { player={...defaults}; }
  const categories = [["Action","🚀"],["Puzzle","🧩"],["Arcade","👾"],["Strategy","♞"],["Racing","🏁"],["Sports","⚽"],["Classic","🕹️"]];
  let selectedCategory="all";
  const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function save(){try{localStorage.setItem(STORE,JSON.stringify(player));}catch(e){console.warn("Local save unavailable",e);}renderPlayer();}
  function initBackend(){
    if(!window.supabase?.createClient || SUPABASE_PUBLISHABLE_KEY.startsWith("PASTE_")){
      $("authStatus").textContent="Add your Supabase publishable key to enable online accounts.";
      $("profileStorageNote").textContent="Local progress is active. Online sync is waiting for backend configuration.";
      $("profileMode").textContent="LOCAL + ONLINE READY"; $("leaderboardMode").textContent="NOT CONNECTED";
      $("leaderboardNote").textContent="Configure the Supabase publishable key and database tables to enable global rankings.";
      return;
    }
    try{
      supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      onlineReady=true;
      supabase.auth.getSession().then(({data})=>{currentUser=data.session?.user||null;syncAuthUI();if(currentUser)loadCloudProfile();loadLeaderboard();});
      supabase.auth.onAuthStateChange((event,session)=>{currentUser=session?.user||null;syncAuthUI();if(currentUser){loadCloudProfile();loadLeaderboard();}else renderLocalBoard();});
      $("leaderboardNote").textContent="Sign in to submit scores to the shared leaderboard.";
    }catch(e){console.error("Supabase init failed",e);$("authStatus").textContent="Backend could not initialise. Check project settings.";}
  }
  function syncAuthUI(){
    $("signOutButton").hidden=!currentUser;
    $("signInButton").textContent=currentUser?"Signed in":"Sign in";
    $("signInButton").disabled=!!currentUser;
    $("authStatus").textContent=currentUser?`Signed in as ${currentUser.email||"player"}`:"Not signed in";
    $("profileMode").textContent=currentUser?"CLOUD SYNC ON":"LOCAL PROFILE";
    $("profileStorageNote").textContent=currentUser?"Your account is connected. Scores and XP can sync through the online database.":"Local progress is saved on this device. Sign in to sync scores online.";
    $("leaderboardMode").textContent=currentUser?"GLOBAL":"SIGN IN";
  }
  async function signIn(){
    if(!supabase){$("authStatus").textContent="Add the Supabase publishable key first.";return;}
    const email=$("authEmail").value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){$("authStatus").textContent="Enter a valid email address.";return;}
    $("signInButton").disabled=true;$("authStatus").textContent="Sending secure sign-in link…";
    const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname}});
    $("signInButton").disabled=false;
    $("authStatus").textContent=error?`Sign-in error: ${error.message}`:"Check your email for the sign-in link.";
  }
  async function signOut(){if(supabase)await supabase.auth.signOut();}
  async function loadCloudProfile(){
    if(!supabase||!currentUser)return;
    const {data,error}=await supabase.from("profiles").select("username,xp,tokens").eq("id",currentUser.id).maybeSingle();
    if(error){console.warn("Profile load:",error.message);$("authStatus").textContent="Signed in; database setup is still required.";return;}
    if(data){player.name=data.username||player.name;player.xp=Math.max(player.xp,Number(data.xp)||0);player.tokens=Math.max(player.tokens,Number(data.tokens)||0);save();}
    else await saveCloudProfile();
  }
  async function saveCloudProfile(){
    if(!supabase||!currentUser)return;
    const {error}=await supabase.from("profiles").upsert({id:currentUser.id,username:player.name},{onConflict:"id"});
    if(error)console.warn("Cloud profile save:",error.message);
  }
  async function loadLeaderboard(){
    if(boardMode==="local"||!supabase||!currentUser){renderLocalBoard();return;}
    const {data,error}=await supabase.from("profiles").select("username,xp,tokens").order("xp",{ascending:false}).limit(100);
    if(error){$("leaderboardNote").textContent="Online leaderboard is not ready. Run the Phase 3 database setup SQL.";renderLocalBoard();return;}
    $("leaderboardNote").textContent="Top players worldwide · ranked by XP";
    $("leaderboardList").innerHTML=(data||[]).map((row,i)=>`<div class="leader-row"><span>${i+1}. ${escapeText(row.username||"Player")}</span><b>${Number(row.xp)||0} XP</b></div>`).join("")||'<p class="muted">No players yet. Be the first!</p>';
  }
  function renderLocalBoard(){
    const rows=[{name:player.name,xp:player.xp},...(player.scores||[]).map(s=>({name:s.name||player.name,xp:s.xp||0}))].sort((a,b)=>b.xp-a.xp).slice(0,10);
    $("leaderboardList").innerHTML=rows.map((r,i)=>`<div class="leader-row"><span>${i+1}. ${escapeText(r.name)}</span><b>${r.xp} XP</b></div>`).join("");
  }
  function renderCategories(){
    const grid=$("categoryGrid"),filter=$("categoryFilter");grid.innerHTML="";
    categories.forEach(([name,icon])=>{const button=document.createElement("button");button.className="category-card"+(selectedCategory===name?" selected":"");button.innerHTML=`<span class="cat-icon">${icon}</span><span>${name}</span>`;button.addEventListener("click",()=>{selectedCategory=selectedCategory===name?"all":name;filter.value=selectedCategory;renderCategories();renderGames();});grid.append(button);const option=document.createElement("option");option.value=name;option.textContent=name;filter.append(option);});
  }
  function renderGames(){
    const query=($("librarySearch").value||$("searchInput").value).trim().toLowerCase(),category=$("categoryFilter").value;
    const list=(window.ARCADE_CATALOG||[]).filter(g=>(selectedCategory==="all"||g.category===selectedCategory)&&(category==="all"||g.category===category)&&(!query||(g.title+" "+g.description+" "+g.category).toLowerCase().includes(query)));
    const frag=document.createDocumentFragment();
    list.forEach(g=>{const card=document.createElement("article");card.className="game-card";card.innerHTML=`<span class="game-icon">${escapeText(g.icon)}</span><h3>${escapeText(g.title)}</h3><p>${escapeText(g.description)}</p><p class="game-meta">${escapeText(g.category)} · ${escapeText(g.difficulty)} · Variant ${g.variantNumber}/5</p><button type="button">Play game →</button>`;card.querySelector("button").addEventListener("click",()=>openGame(g));frag.append(card);});
    $("gameGrid").replaceChildren(frag);$("gameCount").textContent=`${list.length} games shown · ${(window.ARCADE_CATALOG||[]).length} total`;$("emptyState").hidden=list.length!==0;
  }
  function openGame(g){
    $("dialogTitle").textContent=g.title;$("dialogDescription").textContent=g.description;$("currentScore").textContent="0";$("bestScore").textContent=localStorage.getItem("ga_best_"+g.id)||"0";$("gameMessage").textContent="Press Start to play.";
    $("gameDialog").showModal();window.currentArcadeGame=g;
  }
  function renderPlayer(){
    $("xpCount").textContent=player.xp;$("tokenCount").textContent=player.tokens;$("profileXP").textContent=player.xp;$("profileTokens").textContent=player.tokens;$("playedCount").textContent=player.played;$("playerName").value=player.name;$("achievementCount").textContent=player.achievements.length;
    const list=$("achievementList");list.innerHTML="";
    [["First Steps","Play your first game","🎮",player.played>=1],["Getting Started","Earn 100 XP","⚡",player.xp>=100],["Arcade Regular","Play 10 games","🏆",player.played>=10]].forEach(([title,desc,icon,done])=>{const row=document.createElement("div");row.className="achievement"+(done?"":" locked");row.innerHTML=`<span>${icon}</span><div><b>${title}</b><br><small>${desc} ${done?"· Unlocked":"· Locked"}</small></div>`;list.append(row);});
    if(boardMode==="local"||!currentUser)renderLocalBoard();
  }
  async function recordRun(game,score){
    player.played++;const gainedXP=Math.max(5,Math.floor(score/5)),gainedTokens=Math.max(1,Math.floor(score/100));player.xp+=gainedXP;player.tokens+=gainedTokens;
    if(player.played>=1&&!player.achievements.includes("first"))player.achievements.push("first");
    player.scores=[...(player.scores||[]),{name:player.name,xp:player.xp,gameId:game.id,score}].slice(-100);save();
    if(supabase&&currentUser){
      const {error}=await supabase.from("scores").insert({user_id:currentUser.id,game_id:String(game.id),game_title:String(game.title).slice(0,100),score:Math.max(0,Math.floor(score))});
      if(error){console.warn("Score upload failed:",error.message);$("authStatus").textContent="Score saved locally; online submission failed.";}
      else {await saveCloudProfile();if(boardMode==="global")loadLeaderboard();}
    }
  }
  function bind(){
    $("searchInput").addEventListener("input",()=>{$("librarySearch").value=$("searchInput").value;renderGames();if(location.hash!=="#games")location.hash="games";});
    $("librarySearch").addEventListener("input",renderGames);
    $("categoryFilter").addEventListener("change",()=>{selectedCategory="all";renderCategories();renderGames();});
    $("saveProfile").addEventListener("click",()=>{player.name=$("playerName").value.trim().slice(0,20)||"Player";save();saveCloudProfile();});
    $("signInButton").addEventListener("click",signIn);$("signOutButton").addEventListener("click",signOut);
    $("closeGame").addEventListener("click",()=>{window.ArcadeEngine.stop();$("gameDialog").close();});
    $("gameDialog").addEventListener("close",()=>window.ArcadeEngine.stop());
    $("gameDialog").addEventListener("click",e=>{if(e.target===$("gameDialog")){$("gameDialog").close();}});
    $("startGame").addEventListener("click",()=>{if(window.currentArcadeGame)window.ArcadeEngine.start(window.currentArcadeGame);});
    $("gameAction").addEventListener("click",()=>document.dispatchEvent(new KeyboardEvent("keydown",{key:" "})));
    $("globalBoardTab").addEventListener("click",()=>{boardMode="global";$("globalBoardTab").classList.add("active");$("localBoardTab").classList.remove("active");loadLeaderboard();});
    $("localBoardTab").addEventListener("click",()=>{boardMode="local";$("localBoardTab").classList.add("active");$("globalBoardTab").classList.remove("active");renderLocalBoard();});
  }
  window.ArcadeApp={recordRun};
  document.addEventListener("DOMContentLoaded",()=>{renderCategories();renderGames();renderPlayer();bind();initBackend();});
})();
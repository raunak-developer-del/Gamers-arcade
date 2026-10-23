/* Stage 4: actual gameplay should use these powers-of-two tiers for its own parameters. */
(function(global){
 const LEVELS=Array.from({length:12},(_,i)=>2**i);
 const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
 function scale(base,mult,opts={}) {
   const m=clamp(Number(mult)||1,1,2048), curve=opts.curve||"sqrt";
   const factor=curve==="linear"?m:curve==="log"?1+Math.log2(m):Math.sqrt(m);
   return clamp(base*factor,opts.min??base,opts.max??base*8);
 }
 global.ArcadeDifficulty={LEVELS,scale,tierForLevel(level){return LEVELS[clamp(Math.floor(level)-1,0,11)]}};
})(window);

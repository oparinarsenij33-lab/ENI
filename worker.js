export default {
  async fetch(req){
    const q=new URL(req.url).searchParams.get('q')||'';
    const H={'Access-Control-Allow-Origin':'*','Content-Type':'application/json; charset=utf-8'};
    if(!q)return new Response('[]',{headers:H});
    try{
      const r=await fetch('https://html.duckduckgo.com/html/?q='+encodeURIComponent(q),{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}});
      const t=await r.text();const out=[];
      const re=/class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;let m;
      while((m=re.exec(t))!==null&&out.length<5)out.push({title:m[2].replace(/<[^>]*>/g,'').trim(),snippet:''});
      const re2=/class="result__snippet"[^>]*>([\s\S]*?)<\/(?:a|td)/g;let i=0,s;
      while((s=re2.exec(t))!==null&&i<out.length){out[i].snippet=s[1].replace(/<[^>]*>/g,'').trim();i++}
      return new Response(JSON.stringify(out),{headers:H});
    }catch(e){return new Response('[]',{headers:H})}
  }
}

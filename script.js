const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const editors = {
  html: $("#htmlEditor"),
  css: $("#cssEditor"),
  js: $("#jsEditor")
};

let currentName = "Untitled App";
let runTimer;

const templates = {
  study: {
    name: "Focus Quest",
    html: `<div class="app">
      <div class="badge">🔥 <span id="streak">1</span> day streak</div>
      <h1>Focus Quest</h1>
      <p>Turn study time into XP.</p>
      <div class="timer" id="timer">25:00</div>
      <div class="buttons">
        <button id="start">Start Focus</button>
        <button id="reset">Reset</button>
      </div>
      <div class="xp">
        <span>Level 1</span>
        <b id="xp">0 XP</b>
        <div><i id="bar"></i></div>
      </div>
    </div>`,

    css: `body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:#0b1020;
      color:#fff;
      font-family:system-ui
    }

    .app{
      text-align:center;
      width:min(88%,420px);
      padding:30px;
      border:1px solid #293452;
      border-radius:25px;
      background:#121a30;
      box-shadow:0 25px 80px #0008
    }

    .badge{
      display:inline-block;
      background:#252f50;
      padding:7px 12px;
      border-radius:99px;
      color:#fbbf24
    }

    h1{
      font-size:36px;
      margin:18px 0 3px
    }

    p{color:#94a3b8}

    .timer{
      font-size:72px;
      font-weight:800;
      letter-spacing:-4px;
      margin:25px 0
    }

    .buttons{
      display:flex;
      gap:9px;
      justify-content:center
    }

    button{
      border:0;
      border-radius:12px;
      padding:12px 18px;
      font-weight:800;
      cursor:pointer
    }

    #start{
      background:#8b5cf6;
      color:#fff
    }

    .xp{
      text-align:left;
      margin-top:28px;
      color:#cbd5e1
    }

    .xp b{float:right}

    .xp div{
      height:9px;
      background:#27324a;
      border-radius:9px;
      margin-top:8px;
      overflow:hidden
    }

    .xp i{
      display:block;
      height:100%;
      width:0;
      background:#8b5cf6;
      transition:.3s
    }`,

    js: `let seconds=1500;
let timer=null;
let xp=0;

const draw=()=>{
  let m=Math.floor(seconds/60);
  let s=seconds%60;

  document.querySelector('#timer').textContent=
    m+':'+String(s).padStart(2,'0');
};

document.querySelector('#start').onclick=()=>{
  if(timer)return;

  timer=setInterval(()=>{
    if(seconds>0){
      seconds--;
      draw();
    }else{
      clearInterval(timer);
      timer=null;

      xp+=25;

      document.querySelector('#xp').textContent=xp+' XP';
      document.querySelector('#bar').style.width=
        Math.min(xp,100)+'%';

      alert('Focus complete! +25 XP');
    }
  },1000);
};

document.querySelector('#reset').onclick=()=>{
  clearInterval(timer);
  timer=null;
  seconds=1500;
  draw();
};

draw();`
  },

  calculator: {
    name: "Glass Calculator",

    html: `<main>
      <h2>Calculator</h2>
      <input id="screen" readonly value="0">
      <div id="keys"></div>
    </main>`,

    css: `body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:linear-gradient(135deg,#111827,#312e81);
      font-family:system-ui
    }

    main{
      width:300px;
      padding:20px;
      border-radius:24px;
      background:#ffffff12;
      backdrop-filter:blur(20px);
      border:1px solid #ffffff25
    }

    h2{color:white}

    input{
      width:100%;
      box-sizing:border-box;
      background:#090e1c;
      color:white;
      border:0;
      border-radius:12px;
      padding:17px;
      text-align:right;
      font-size:30px;
      margin-bottom:12px
    }

    #keys{
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:8px
    }

    button{
      height:55px;
      border:0;
      border-radius:12px;
      background:#ffffff17;
      color:white;
      font-size:18px
    }

    button:hover{
      background:#ffffff28
    }`,

    js: `const keys=[
'C','(',')','/',
'7','8','9','*',
'4','5','6','-',
'1','2','3','+',
'0','.','⌫','='
];

const screen=document.querySelector('#screen');
const box=document.querySelector('#keys');

let value='';

keys.forEach(x=>{
  let button=document.createElement('button');

  button.textContent=x;

  button.onclick=()=>{

    if(x==='C'){
      value='';
    }

    else if(x==='⌫'){
      value=value.slice(0,-1);
    }

    else if(x==='='){
      try{
        value=String(
          Function('"use strict";return ('+value+')')()
        );
      }catch{
        value='Error';
      }
    }

    else{
      value+=x;
    }

    screen.value=value||'0';
  };

  box.appendChild(button);
});`
  },

  quiz: {
    name: "Quick Quiz",

    html: `<main>
      <div class="top">
        <span>Quick Quiz</span>
        <b id="score">0 pts</b>
      </div>

      <h1 id="q"></h1>

      <div id="answers"></div>

      <p id="progress"></p>
    </main>`,

    css: `body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:#f4f7fb;
      font-family:system-ui;
      color:#172033
    }

    main{
      width:min(86%,500px);
      background:white;
      padding:28px;
      border-radius:22px;
      box-shadow:0 20px 60px #17203320
    }

    .top{
      display:flex;
      justify-content:space-between;
      color:#6d28d9
    }

    h1{
      font-size:26px;
      margin:28px 0
    }

    button{
      display:block;
      width:100%;
      text-align:left;
      margin:8px 0;
      padding:14px;
      border:1px solid #e2e8f0;
      border-radius:12px;
      background:#fafafa;
      font-weight:700
    }

    button:hover{
      border-color:#8b5cf6
    }

    p{color:#94a3b8}`,

    js: `const questions=[
  [
    'Which language runs natively in browsers?',
    ['Python','JavaScript','C++'],
    1
  ],
  [
    'HTML is mainly used for…',
    ['Structure','Database','Hosting'],
    0
  ],
  [
    'CSS controls…',
    ['Emails','Styling','Servers'],
    1
  ]
];

let index=0;
let score=0;

function show(){

  if(index>=questions.length){

    document.querySelector('#q').textContent='Finished! 🎉';

    document.querySelector('#answers').innerHTML=
      '<h2>'+score+' / '+questions.length+' correct</h2>';

    return;
  }

  let [question,answers,correct]=questions[index];

  document.querySelector('#q').textContent=question;

  document.querySelector('#progress').textContent=
    'Question '+(index+1)+' of '+questions.length;

  let box=document.querySelector('#answers');

  box.innerHTML='';

  answers.forEach((answer,n)=>{

    let button=document.createElement('button');

    button.textContent=answer;

    button.onclick=()=>{

      if(n===correct){
        score++;
      }

      index++;

      document.querySelector('#score').textContent=
        (score*100)+' pts';

      show();
    };

    box.appendChild(button);
  });
}

show();`
  },

  portfolio: {
    name: "Developer Portfolio",

    html: `<nav>
      <b>DEV.</b>
      <a href="#work">Work</a>
      <a href="#about">About</a>
    </nav>

    <main>
      <span class="tag">AVAILABLE FOR PROJECTS</span>

      <h1>
        I build digital<br>
        <em>experiences.</em>
      </h1>

      <p>
        Developer creating fast, useful and playful
        products for the web.
      </p>

      <button onclick="document.querySelector('#work').scrollIntoView()">
        See my work ↓
      </button>
    </main>

    <section id="work">

      <h2>Selected work</h2>

      <div class="grid">

        <article>
          AI Tool
          <br>
          <small>Web Application</small>
        </article>

        <article>
          Game
          <br>
          <small>JavaScript</small>
        </article>

        <article>
          Mobile UI
          <br>
          <small>Product Design</small>
        </article>

      </div>

    </section>`,

    css: `*{box-sizing:border-box}

body{
  margin:0;
  background:#0a0a0a;
  color:#f5f5f5;
  font-family:system-ui
}

nav{
  height:70px;
  display:flex;
  align-items:center;
  gap:25px;
  padding:0 7%;
  border-bottom:1px solid #222
}

nav b{
  margin-right:auto;
  font-size:22px
}

nav a{
  color:#aaa;
  text-decoration:none
}

main{
  padding:12vh 7%;
  min-height:70vh
}

.tag{
  font-size:11px;
  color:#a3e635;
  border:1px solid #365314;
  padding:7px 10px;
  border-radius:20px
}

h1{
  font-size:clamp(52px,9vw,110px);
  line-height:.9;
  letter-spacing:-6px;
  margin:30px 0
}

em{
  color:#8b5cf6;
  font-style:normal
}

p{
  color:#999;
  max-width:520px;
  font-size:18px
}

button{
  margin-top:20px;
  padding:12px 17px;
  background:white;
  border:0;
  border-radius:8px;
  font-weight:800
}

section{
  padding:50px 7%
}

.grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px
}

article{
  height:180px;
  background:#151515;
  border:1px solid #252525;
  padding:22px;
  border-radius:15px;
  font-size:25px
}

small{color:#777}

@media(max-width:600px){

  .grid{
    grid-template-columns:1fr
  }

  h1{
    letter-spacing:-3px
  }

}`,

    js: `console.log('Portfolio loaded successfully');`
  },

  game: {
    name: "Tap Rush",

    html: `<main>

      <div class="hud">
        <b>⚡ Tap Rush</b>
        <span>
          Score:
          <b id="score">0</b>
        </span>
      </div>

      <div id="arena">
        <button id="target">TAP!</button>
      </div>

      <p>
        You have
        <b id="time">20</b>
        seconds. Hit the moving target!
      </p>

      <button id="start">Start Game</button>

    </main>`,

    css: `body{
      margin:0;
      min-height:100vh;
      display:grid;
      place-items:center;
      background:#07111f;
      color:white;
      font-family:system-ui
    }

    main{
      width:min(90%,500px);
      text-align:center
    }

    .hud{
      display:flex;
      justify-content:space-between;
      margin-bottom:10px
    }

    #arena{
      height:420px;
      position:relative;
      background:#0e1b2e;
      border:1px solid #263a55;
      border-radius:22px;
      overflow:hidden
    }

    #target{
      display:none;
      position:absolute;
      width:72px;
      height:72px;
      border-radius:50%;
      border:0;
      background:#f43f5e;
      color:white;
      font-weight:900;
      box-shadow:0 0 30px #f43f5e77
    }

    #start{
      padding:12px 20px;
      border:0;
      border-radius:10px;
      background:#8b5cf6;
      color:white;
      font-weight:800
    }`,

    js: `let score=0;
let left=20;
let timer;

const target=document.querySelector('#target');
const arena=document.querySelector('#arena');

function move(){

  target.style.left=
    Math.random()*(arena.clientWidth-72)+'px';

  target.style.top=
    Math.random()*(arena.clientHeight-72)+'px';
}

target.onclick=()=>{

  score++;

  document.querySelector('#score').textContent=score;

  move();
};

document.querySelector('#start').onclick=()=>{

  clearInterval(timer);

  score=0;
  left=20;

  target.style.display='block';

  move();

  document.querySelector('#score').textContent=0;
  document.querySelector('#time').textContent=left;

  timer=setInterval(()=>{

    left--;

    document.querySelector('#time').textContent=left;

    if(left<=0){

      clearInterval(timer);

      target.style.display='none';

      alert('Final score: '+score);
    }

  },1000);
};`
  }
};


// STATUS

function setStatus(text){
  $("#status").textContent=text;
}


// LOAD TEMPLATE

function loadTemplate(key){

  const template=templates[key];

  if(!template)return;

  currentName=template.name;

  editors.html.value=template.html;
  editors.css.value=template.css;
  editors.js.value=template.js;

  setStatus("Generated");

  run();
}


// SMART TEMPLATE CHOICE

function chooseTemplate(prompt){

  prompt=prompt.toLowerCase();

  if(/calc|math/.test(prompt))
    return "calculator";

  if(/quiz|question|test/.test(prompt))
    return "quiz";

  if(/portfolio|profile|developer|personal site/.test(prompt))
    return "portfolio";

  if(/game|tap|arcade/.test(prompt))
    return "game";

  return "study";
}


// AI GENERATION

async function generate(){

  let prompt=$("#prompt").value.trim();

  if(!prompt){

    $("#prompt").focus();

    setStatus("Enter a prompt");

    return;
  }

  const endpoint=
    localStorage.getItem("devforge-ai-endpoint");

  // DEMO MODE

  if(!endpoint){

    setStatus("Smart Demo…");

    setTimeout(()=>{

      let key=chooseTemplate(prompt);

      loadTemplate(key);

      currentName=prompt.slice(0,36);

      setStatus("Demo built ✓");

    },350);

    return;
  }


  // REAL AI MODE

  setStatus("AI building…");

  $("#generateBtn").disabled=true;

  try{

    const token=
      localStorage.getItem("devforge-ai-token")||"";

    const response=await fetch(endpoint,{

      method:"POST",

      headers:{
        "Content-Type":"application/json",

        ...(token
          ?{"Authorization":"Bearer "+token}
          :{})
      },

      body:JSON.stringify({

        prompt:prompt,

        currentCode:{
          html:editors.html.value,
          css:editors.css.value,
          js:editors.js.value
        }

      })

    });


    if(!response.ok){

      throw new Error(
        "AI endpoint returned "+response.status
      );

    }


    const data=await response.json();


    if(
      !data.html ||
      typeof data.css!=="string" ||
      typeof data.js!=="string"
    ){

      throw new Error(
        "Endpoint must return html, css and js."
      );

    }


    editors.html.value=data.html;
    editors.css.value=data.css;
    editors.js.value=data.js;

    currentName=
      data.name || prompt.slice(0,36);


    run();

    setStatus("AI built ✓");

  }

  catch(error){

    $("#consoleOutput").textContent=
      "❌ AI: "+error.message;

    setStatus("AI error");

  }

  finally{

    $("#generateBtn").disabled=false;

  }
}


// SAFE SCRIPT

function safeScript(script){

  return script.replace(
    /<\/script/gi,
    "<\\/script"
  );

}


// RUN APP

function run(){

  clearTimeout(runTimer);

  const bridge=`
<script>

const send=(type,args)=>{

  parent.postMessage({

    devforge:true,

    type,

    args:args.map(x=>{

      try{

        return typeof x==='object'
          ?JSON.stringify(x)
          :String(x);

      }catch(e){

        return String(x);

      }

    })

  },'*');

};


['log','warn','error'].forEach(type=>{

  const old=console[type];

  console[type]=(...args)=>{

    send(type,args);

    old(...args);

  };

});


window.onerror=(message,source,line)=>{

  send(
    'error',
    [message+' (line '+line+')']
  );

};

<\/script>`;


  const documentCode=`
<!doctype html>

<html>

<head>

<meta
name="viewport"
content="width=device-width,initial-scale=1">

<style>

${editors.css.value}

</style>

</head>

<body>

${editors.html.value}

${bridge}

<script>

${safeScript(editors.js.value)}

<\/script>

</body>

</html>`;


  $("#previewFrame").srcdoc=documentCode;

  setStatus("Running");
}


// CONSOLE

window.addEventListener(
  "message",
  event=>{

    if(!event.data?.devforge)
      return;

    const output=$("#consoleOutput");

    let icon=
      event.data.type==="error"
      ?"❌"
      :event.data.type==="warn"
      ?"⚠️"
      :"›";


    output.textContent+=
      (output.textContent?"\n":"")+
      icon+" "+
      event.data.args.join(" ");


    output.scrollTop=
      output.scrollHeight;

  }
);


// SAVE PROJECT

function save(){

  let name=
    prompt(
      "Project name:",
      currentName
    ) || currentName;


  let projects=
    JSON.parse(
      localStorage.getItem(
        "devforge-projects"
      ) || "{}"
    );


  projects[name]={

    html:editors.html.value,

    css:editors.css.value,

    js:editors.js.value,

    date:new Date().toLocaleString()

  };


  localStorage.setItem(
    "devforge-projects",
    JSON.stringify(projects)
  );


  currentName=name;

  renderProjects();

  setStatus("Saved ✓");
}


// PROJECT LIST

function renderProjects(){

  let projects=
    JSON.parse(
      localStorage.getItem(
        "devforge-projects"
      ) || "{}"
    );


  const box=$("#projectList");

  box.innerHTML="";


  let names=
    Object.keys(projects);


  if(!names.length){

    box.innerHTML=
      '<p class="hint">No saved projects yet. Build something and press Save.</p>';

    return;

  }


  names.reverse().forEach(name=>{

    let project=
      document.createElement("div");


    project.className="project";


    project.innerHTML=`

<strong></strong>

<small></small>

<div class="actions">

<button class="open">
Open
</button>

<button class="del danger">
Delete
</button>

</div>`;


    project.querySelector("strong")
      .textContent=name;


    project.querySelector("small")
      .textContent=
        projects[name].date;


    project.querySelector(".open")
      .onclick=()=>{

        Object.keys(editors)
          .forEach(key=>{

            editors[key].value=
              projects[name][key];

          });


        currentName=name;

        run();

      };


    project.querySelector(".del")
      .onclick=()=>{

        delete projects[name];

        localStorage.setItem(
          "devforge-projects",
          JSON.stringify(projects)
        );

        renderProjects();

      };


    box.appendChild(project);

  });

}


// EXPORT PROJECT

function exportProject(){

  const full=`
<!doctype html>

<html>

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1">

<title>
${currentName.replace(/[<>]/g,"")}
</title>

<style>

${editors.css.value}

</style>

</head>

<body>

${editors.html.value}

<script>

${safeScript(editors.js.value)}

<\/script>

</body>

</html>`;


  const blob=
    new Blob(
      [full],
      {type:"text/html"}
    );


  const url=
    URL.createObjectURL(blob);


  const link=
    document.createElement("a");


  link.href=url;

  link.download=
    (
      currentName
      .replace(/[^a-z0-9]+/gi,"-")
      .toLowerCase()
      ||
      "app"
    )+".html";


  link.click();


  URL.revokeObjectURL(url);


  setStatus("Exported ✓");
}


// BASIC CODE FIXER

function fixCode(){

  let code=
    editors.js.value;

  let changed=false;


  const replacements=[

    ["“",'"'],

    ["”",'"'],

    ["‘","'"],

    ["’","'"]

  ];


  replacements.forEach(
    ([from,to])=>{

      if(code.includes(from)){

        code=
          code.split(from).join(to);

        changed=true;

      }

    }
  );


  if(
    !editors.html.value.trim()
  ){

    editors.html.value=
      "<main><h1>Hello Dev!</h1></main>";

    changed=true;

  }


  editors.js.value=code;


  $("#consoleOutput").textContent=
    changed

    ?"✨ Applied basic syntax cleanup. Run your app to test it."

    :"✨ No obvious issues found. Check the console after Run.";


  run();
}


// EDITOR TABS

$$(".tab").forEach(button=>{

  button.onclick=()=>{

    $$(".tab").forEach(
      tab=>tab.classList.remove("active")
    );


    Object.values(editors)
      .forEach(
        editor=>editor.classList.remove("active")
      );


    button.classList.add("active");


    editors[
      button.dataset.tab
    ].classList.add("active");

  };

});


// TEMPLATE BUTTONS

$$("[data-template]")
.forEach(button=>{

  button.onclick=()=>{

    loadTemplate(
      button.dataset.template
    );

  };

});


// DEVICE PREVIEW

$$(".device-switch button")
.forEach(button=>{

  button.onclick=()=>{

    $$(".device-switch button")
      .forEach(
        item=>item.classList.remove("active")
      );


    button.classList.add("active");


    $("#previewFrame").style.width=

      button.dataset.width==="100%"

      ?"100%"

      :button.dataset.width+"px";

  };

});


// LIVE CODE UPDATE

Object.values(editors)
.forEach(editor=>{

  editor.addEventListener(
    "input",
    ()=>{

      clearTimeout(runTimer);

      runTimer=
        setTimeout(run,650);

    }
  );

});


// MAIN BUTTONS

$("#generateBtn").onclick=generate;

$("#runBtn").onclick=run;

$("#saveBtn").onclick=save;

$("#exportBtn").onclick=exportProject;

$("#fixBtn").onclick=fixCode;


$("#clearConsole").onclick=()=>{

  $("#consoleOutput").textContent="";

};


// NEW PROJECT

$("#newBtn").onclick=()=>{

  if(
    confirm(
      "Start a new project? Unsaved changes will be lost."
    )
  ){

    Object.values(editors)
      .forEach(
        editor=>editor.value=""
      );


    currentName="Untitled App";

    $("#prompt").value="";

    run();

  }

};


// DELETE ALL PROJECTS

$("#deleteAllBtn").onclick=()=>{

  if(
    confirm(
      "Delete all locally saved projects?"
    )
  ){

    localStorage.removeItem(
      "devforge-projects"
    );

    renderProjects();

  }

};


// AI SETTINGS

const settings=
  $("#settingsDialog");


$("#settingsBtn").onclick=()=>{

  $("#endpointInput").value=
    localStorage.getItem(
      "devforge-ai-endpoint"
    ) || "";


  $("#tokenInput").value=
    localStorage.getItem(
      "devforge-ai-token"
    ) || "";


  settings.showModal();

};


$("#saveAiBtn").onclick=()=>{

  let endpoint=
    $("#endpointInput")
    .value
    .trim();


  if(
    endpoint &&
    !/^https?:\/\//i.test(endpoint)
  ){

    alert(
      "Enter a full http(s) endpoint URL."
    );

    return;

  }


  localStorage.setItem(
    "devforge-ai-endpoint",
    endpoint
  );


  localStorage.setItem(
    "devforge-ai-token",
    $("#tokenInput").value
  );


  settings.close();


  setStatus(
    endpoint
    ?"AI connected ✓"
    :"Demo mode"
  );

};


$("#clearAiBtn").onclick=()=>{

  localStorage.removeItem(
    "devforge-ai-endpoint"
  );

  localStorage.removeItem(
    "devforge-ai-token"
  );


  $("#endpointInput").value="";

  $("#tokenInput").value="";


  settings.close();

  setStatus("Demo mode");

};


// START DEVFORGE

loadTemplate("study");

renderProjects();


if(
  localStorage.getItem(
    "devforge-ai-endpoint"
  )
){

  setStatus("AI connected");

}

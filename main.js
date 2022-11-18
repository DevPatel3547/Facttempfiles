const D = document;
const initSqlJs = window.initSqlJs;






const db = window.openDatabase('data', '1.0', 'data', 1*1024*1024);



// function testone(){
//     if(D.getElementById("trivialcbox1").checked){
//       let x = D.getElementById("step2answer").value;
//       //console.log(x)
//       const coords = D.querySelector("#coords > span").innerText;
//       console.log(coords);
//     }
// }



function initdatabasesql(){
  // Create a database

  let sqlstr = "CREATE TABLE hello (a int, b char); \
  INSERT INTO hello VALUES (0, 'hello'); \
  INSERT INTO hello VALUES (1, 'world');";
  db.run(sqlstr); // Run the query without returning anything

  // Prepare an sql statement
  const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

  // Bind values to the parameters and fetch the results of the query
  const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
  console.log(result); // Will print {a:1, b:'world'}
}

function initMap() {
  const myLatLon = { lat: 31.5, lon: -99.0 };
  // bounding box around the US
  const usExtent = ol.extent.boundingExtent([[-14400000, 2700000], [-14400000, 6580000], [-7200000, 6580000], [-7200000, 2700000]]);


  // create current location pin
  const locIconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([myLatLon.lon, myLatLon.lat])),
  });
  const locIconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      scale: 1,
      crossOrgin: "",
      src: "./assets/location-dot-solid-1.svg",
    }),
  });

  locIconFeature.setStyle(locIconStyle);

  const vectorSource = new ol.source.Vector({
    features: [locIconFeature],
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });


  const map  = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([myLatLon.lon, myLatLon.lat]),
      zoom: 5,
      extent: usExtent,
      enableRotation: false,
    }),
    controls: [
      new ol.control.Zoom(),
      new ol.control.Attribution()
    ]
  });



  map.on("click", (e) => {
    const coords = map.getEventCoordinate(e.originalEvent);
    locIconFeature.setGeometry(new ol.geom.Point(coords));

    const latLon = ol.proj.toLonLat(coords)
    D.querySelector("#coords > span").innerHTML = `${latLon[1].toFixed(6)} ${latLon[0].toFixed(6)}`;
    stepFunctions.step1.coordsUpdate();
  });
}



// //Function for initializing and creating a database
// function initdatabase(){
//   db.transaction(t => {

//     t.executeSql('CREATE TABLE survey (Question TEXT, Answer Text)');
//   }, e => console.error(e));
// }


// //Function for inserting values of the entire form step by btep into the database
// function insertdatabase(){

//   db.transaction(t => {
//     //for testing purposes
//     t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)',
//     [" ", " "]);

//     //inserting step1 values
//     t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)',
//     ["Where is your crop field located?", D.querySelector("#coords > span").innerText]);


//     //inserting step 2 values
//     if(D.getElementById("step2button1").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["What do you prioritize in variety selection? ", "Disease Resistance"]);
//     }
//     else if(D.getElementById("step2button2").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["What do you prioritize in variety selection?", "Seedling Vigor"]);
//     }
//     else if(D.getElementById("step2button3").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["What do you prioritize in variety selection? ", "Yield"]);
//     }
//     else{
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["What do you prioritize in variety selection? ", D.getElementById("step2answer").value]);
//     }


//     //inserting step3 values
//     if(D.getElementById("trivialcbox1").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Trivial"]);
//     }
//     else if(D.getElementById("moderatecbox1").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Moderate"]);
//     }
//     else if(D.getElementById("majorcbox1").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Major"]);
//     }


//     //inserting step4 values
//     if(D.getElementById("trivialcbox2").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Trivial"]);
//     }
//     else if(D.getElementById("moderatecbox2").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Moderate"]);
//     }
//     else if(D.getElementById("majorcbox2").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Major"]);
//     }


//     //inserting step5 values
//     if(D.getElementById("trivialcbox3").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Trivial"]);
//     }
//     else if(D.getElementById("moderatecbox3").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Moderate"]);
//     }
//     else if(D.getElementById("majorcbox3").checked){
//       t.executeSql('INSERT INTO survey (Question, Answer) VALUES (?, ?)', 
//       ["On average, how severe is the disease threat ", "Major"]);
//     }


//     // t.executeSql("SELECT* FROM survey", [], function displayResults(t, results){
//     //   for(var i = 0; i < results.rows.length; i++){
//     //     var item = results.rows.items(i);
//     //     $('items').append('<li>' + item.firstName + ' ' + item.lastName + '</li>');
//     //   }
//     // })
//     //console.log(typeof(D.querySelector("#coords > span").innerText));

//   }, e => console.error(e));
// }










function Step1data(){
  //step1 data
  let insertlocation =  D.querySelector("#coords > span").innerHTML;
  return insertlocation;
}


function Step2data(){
  //step2 data
  if(D.getElementById("step2button1").checked){
    let step2insert = "Disease Resistance";
  }
  else if(D.getElementById("step2button2").checked){
    let step2insert = "Seedling Vigor";
    return step2insert;
  }
  else if(D.getElementById("step2button3").checked){
    let step2insert = "Yield";
    return step2insert;
  }
  else{
    let step2insert = D.getElementById("step2answer").value;
    return step2insert;
  }
}


function Step3data(){
  //step3 data
  if(D.getElementById("trivialcbox1").checked){
    let step3insert = "trivial";
    return step3insert;
  }
  else if(D.getElementById("moderatecbox1").checked){
    let step3insert = "moderate";
    return step3insert;
  }
  else if(D.getElementById("majorcbox1").checked){
    let step3insert = "major";
    return step3insert;
  }
}


function Step4data(){
  //step4 data
  if(D.getElementById("trivialcbox2").checked){
    let step4insert = "trivial";
    return step4insert;
  }
  else if(D.getElementById("moderatecbox2").checked){
    let step4insert = "moderate";
    return step4insert;
  }
  else if(D.getElementById("majorcbox2").checked){
    let step4insert = "major";
    return step4insert;
  }
  
}


function Step5data(){
  //step5 data
  if(D.getElementById("trivialcbox3").checked){
    let step5insert = "trivial";
    return step5insert;
  }
  else if(D.getElementById("moderatecbox3").checked){
    let step5insert = "moderate";
    return step5insert;
  }
  else if(D.getElementById("majorcbox3").checked){
    let step5insert = "major";
    return step5insert;
  }
  
}



//Function for removing the database
// function droptable(){
//   db.transaction(t=>{
//   t.executeSql("DROP TABLE survey",[], 
//     function(tb,results){console.log("Successfully Dropped")},
//     function(tb,error){console.log("Could not delete")})
//   }
// )
// }



function submitForm() {
  // testone();
  // initdatabasesql();
  // initdatabase();//comment out once created
  // insertdatabase();
  // let step1data = Step1data();
  // let step2data = Step2data();
  // let step3data = Step3data();
  // let step4data = Step4data();
  // let step5data = Step5data();
  // console.log(step1data);
  // console.log(step2data);
  // console.log(step3data);
  // console.log(step4data);
  // console.log(step5data);
  console.log("test")
  alert("Eventually this information will be sent to a server at which point that will be processed and data will be returned.");

  //D.querySelector("#steps").classList.add("hide");
  D.querySelector("#thankyou").classList.remove("hide");
  // droptable();//uncomment when deletion of table is required
}

function closeAllSteps(stepNum) {
  if(stepNum === undefined) stepNum = -1;
  const stepsEles = D.querySelectorAll("details.step");

  for(let i = 0; i < stepsEles.length; i++) {
    const ele = stepsEles[i];
    if(i == stepNum-1) {
      ele.setAttribute("open", true);

      // scroll the page to make sure the can see the top of the step
      ele.scrollIntoView(true);
    } else {
      ele.removeAttribute("open");
    }
  }

}


function nextStep(currStepNum) {
  const stepsEles = D.querySelectorAll("details.step");

  if(stepFunctions[`step${currStepNum}`].continue) {
    const ele = stepsEles[currStepNum];
    ele.querySelector("summary").removeAttribute("disabled");
    closeAllSteps(currStepNum+1);
  }
}

// used for the custom form element button-select
function updateButtSelectValue(ele) {
  const butts = ele.querySelectorAll("button");

  for(let butt of butts) {
    if(butt.classList.contains("active")) {
      ele.selectedValue = butt.innerText;
      break;
    }
  }
}

function updateContinueState(stepNum, disabled) {
  const butt = D.querySelector(`#step${stepNum} > .step-navigation > button`);

  // update continue variable
  stepFunctions[`step${stepNum}`].continue = !disabled;

  // update button disabled look
  if(disabled) {
    butt.classList.add("disabled");
  } else {
    butt.classList.remove("disabled");
  }
}




const stepFunctions = {
  "step1": {
    continue: false,
    coordsUpdate: function() {
      const coords = D.querySelector("#coords > span").innerText;
      console.log(coords)
      if(coords.split(" ").length === 2) {
        updateContinueState(1, false);
      }

    },
    init: function() {
    },
  },
  "step2": {
    continue: true,
  },
};

const lists = {
  pests: ["Cotton fleahoppers", "Helicoverpa", "Spider mites", "Mirids", "Aphids", "Whiteflies", "Thrips", "Armyworms", "Cotton bollworms"],
  diseases: ["test1", "test2", "test3"],
  weeds: ["Poison Sumac", "Kapanese Knot Weed", "Crabgrass", "Dandelions", "Canada Thistle", "Ground Ivy", "Purslane", "Stinging", "Clover Leaf", "Quakgrass", "Common Ragweed"],
}

function init() {

  initMap();




  // add click event handler to all the "continue" buttons for all the steps
  const stepsEles = D.querySelectorAll("details.step");

  for(let i = 0; i < stepsEles.length; i++) {
    const ele = stepsEles[i];
    const summary = ele.querySelector("summary");
    const butt = ele.querySelector(".step-navigation>button");


    summary.onclick = function() {
      closeAllSteps();
    }

    // dont do the last step since that will be a submit button
    if(i < stepsEles.length - 1) {
      // set continue button disabled state
      updateContinueState(i+1, !stepFunctions[`step${i+1}`].continue);


      butt.onclick = function() {
        // we are passing the step number (which starts at 1 not 0)
        if(stepFunctions[`step${i+1}`].continue)
          nextStep(i+1);
      }
    }
  }


  // add click event handler for ALL custom form element button-select
  const buttSelectors = D.querySelectorAll(".button-select");
  for(let i = 0; i < buttSelectors.length; i++) {
    // add the update event listner to the button-select form element
    buttSelectors[i].addEventListener("update", function() {
      updateButtSelectValue(this);
    });
    // update the value at the start
    buttSelectors[i].dispatchEvent(new Event("update"));

    const buttSelectorButtons = buttSelectors[i].querySelectorAll("button");

    for(let butt of buttSelectorButtons) {
      butt.onclick = function() {
        for(let i = 0; i < buttSelectorButtons.length; i++) {
          const e = buttSelectorButtons[i];
          e.classList.remove("active");
        }
        butt.classList.add("active");

        // tell the button-selector element to update its values
        buttSelectors[i].dispatchEvent(new Event("update"));
      }
    }

  }

  for(const funcs of Object.values(stepFunctions)) {
    if(funcs.init) {
      funcs.init();
    }
  }


  // add svg chivron icon to all .chivron elements
  const chivs = D.querySelectorAll(".chivron");
  for(const chiv of Array.from(chivs)) {
    chiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>`;
  }
}

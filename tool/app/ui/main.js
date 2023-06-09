/*!
 * This is open-source. Which means that you can contribute to it, and help
 * make it better! Also, feel free to use, modify, redistribute, and so on.
 *
 * If you are going to edit the code, always work from the source-code available for download at
 * https://github.com/jhcp/pistar
 */

$(document).ready(function () {
    'use strict';

    istar.graph = istar.setup.setupModel();
    istar.paper = istar.setup.setupDiagram(istar.graph);
    istar.setupMetamodel(istar.metamodel);
    ui.setupUi();

    //wait the ui finish loading before loading a model
    $(document).ready(function () {
        setTimeout(function () {
            istar.fileManager.loadModel(istar.models.processModelParameter());
            ui.selectPaper();//clear selection
            }, 5);
    });

    // ui.alert('Hi there, this is a beta version of the tool, currently under testing. Please send us your feedback at <a href="https://goo.gl/forms/SaJlelSfkTkp819t2">https://goo.gl/forms/SaJlelSfkTkp819t2</a>',
    //     'Beta version');
});

$(document).ready(function () {
    $("#addIdea").click(function () {
      var idea = [];
      for (let i = 1; i < 5; i++) {
        const text = $("#brainstormModal #ideaText" + i).val();
        if(text.replace(/\s/g, '').length)
          idea.push(text);
      }
      
      idea.forEach(e => {
        istar.addIdea(e);
      });
      
    });
});

$('#brainstormModal').on('hidden.bs.modal', function (e) {
  $('#smartwizard').smartWizard("reset");
})

function addIdeasToModel(){
  var idea = [];
  for (let i = 1; i < 5; i++) {
    const text = $("#brainstormModal #ideaText" + i).val();
    if(text.replace(/\s/g, '').length)
      idea.push(text);
  }
  
  idea.forEach(e => {
    istar.addIdea(e);
  });
}

function onContinue() {
  addIdeasToModel();
  $('#brainstormIdeasForm')[0].reset();
}

function onFinish(){ 
  addIdeasToModel();
  onClose();
}

function onClose(){ 
  $('#smartwizard').smartWizard("reset"); 
  $('#brainstormModal').modal('hide'); 
  $('#pdform')[0].reset();
  $('#brainstormIdeasForm')[0].reset();
}

$(function() {
    // SmartWizard initialize
    $('#smartwizard').smartWizard({
      autoAdjustHeight: true,
      toolbar: {
        extraHtml: `<button class="btn btn-default" id='continue' onclick="onContinue()">Add ideas to model and continue</button>
                    <button class="btn btn-success" id='finish' onclick="onFinish()">Add ideas to model and exit</button>`
      }
    });

});

$("#smartwizard").on("showStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
  //on 2nd step, add the previously defined problem/domain 
  if(currentStepIndex == 1){
    $('#finish').show();
    $('#continue').show();
    const element = document.getElementById('brainstormText');
    const pdtext = $('#brainstormModal #pdtext').val();
    element.textContent = pdtext;
    element.style.fontWeight = 'bold'; 
  }else{ //only show finish button on 2nd step
      $('#finish').hide();
      $('#continue').hide();                 
  }
});

$('#pdform').validate({
  ocusInvalid: false,
  rules: {
    pdtext: {
      required: true
    }
  },
  messages : {
    pdtext: "Please enter a problem/domain"
  }

}) 

$("#smartwizard").on("leaveStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
  const text = $('#pdtext');
  //on 1st step and doesn't have any text on form
  if(currentStepIndex == 0 && !text.valid()) { //&& !text.replace(/\s/g, '').length
    //alert('Please define your problem/domain');
    return false;
  } else {
    return true;
  }
});

//API call to get a random persona for the Hall Of Fame technique
async function getPersona() {
  const response = await fetch("https://hall-of-fame.herokuapp.com/api/v1/persona");
  const data = await response.json();
  console.log(data);
  loadPersona(data);
}

//global variable to know which clue is being shown at the moment
var currentClue = 0;
var clues = [];
//load persona into HTML HOF modal
function loadPersona(data) {
  document.getElementById("personaNameCatg").innerHTML = data.name + " (" + data.category + ")";
  document.getElementById("personaHeadline").innerHTML = data.headline;
  document.getElementById("personaDesc").innerHTML = data.description;
  document.getElementById("personaImg").src = data.img;
  clues = data.clues;
  document.getElementById("personaClue").innerHTML = clues[0];
}

function loadNextClue() {
  const element = document.getElementById("personaClue");
  if(currentClue + 1 != clues.length) {
    element.innerHTML = clues[++currentClue];
  } 
}

/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false, console:false, $:false */
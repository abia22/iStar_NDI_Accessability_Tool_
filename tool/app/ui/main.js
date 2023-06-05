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
        const text = $("#exampleModal2 #ideaText" + i).val();
        if(text.replace(/\s/g, '').length)
          idea.push(text);
      }
      
      idea.forEach(e => {
        istar.addIdea(e);
      });
      
    });
});

$('#exampleModal2').on('hidden.bs.modal', function (e) {
  $('#smartwizard').smartWizard("reset");
})

function onFinish(){ 
  var idea = [];
  for (let i = 1; i < 5; i++) {
    const text = $("#exampleModal2 #ideaText" + i).val();
    if(text.replace(/\s/g, '').length)
      idea.push(text);
  }
  
  idea.forEach(e => {
    istar.addIdea(e);
  });

  onCancel();

}

function onCancel(){ $('#smartwizard').smartWizard("reset"); $('#exampleModal2').modal('hide');}

$(function() {
    // SmartWizard initialize
    $('#smartwizard').smartWizard({
      autoAdjustHeight: true,
      toolbar: {
        extraHtml: `<button class="btn btn-success" id='finish' onclick="onFinish()">Finish</button>
                    <button class="btn btn-secondary" onclick="onCancel()">Cancel</button>`
      }
    });

});

$("#smartwizard").on("showStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
  if(currentStepIndex == 1){
    $('#finish').show();
    const element = document.getElementById('brainstormText');
    const pdtext = $('#exampleModal2 #pdtext').val();
    element.textContent = pdtext;
    element.style.fontWeight = 'bold'; 
  }else{
      $('#finish').hide();                
  }
});


/*definition of globals to prevent undue JSHint warnings*/
/*globals istar:false, ui:false, console:false, $:false */
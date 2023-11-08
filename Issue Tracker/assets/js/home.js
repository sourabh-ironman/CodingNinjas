var createProjectButton = document.getElementById('create-project-button');
var createProjectForm = document.getElementById('create-project');


// console.log('createProjectButton', createProjectButton);
createProjectButton.addEventListener('click', function(e){
    createProjectForm.classList.toggle('flex-disp');
})
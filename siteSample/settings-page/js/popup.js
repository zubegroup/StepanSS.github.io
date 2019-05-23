// Get modal element
var modal = document.getElementById('popModal');
//Get close modal button
var closeBtn = document.getElementById('closeModalBtn');

// Listen for close click
closeBtn.addEventListener('click', closeModal);
//Listen for outside modal content click
window.addEventListener('click', clickOutside);


// Function to open modal if cursor leave body
var modalState = false; 
$(document).mouseleave(function () {    
    if(!modalState){
      modal.style.display = 'flex';
        modalState = true;
    }    
});

// Function to close modal
function closeModal(){
   modal.style.display = 'none';
}

// Function to close modal if outside click
function clickOutside(e){
  if(e.target==modal) {
      modal.style.display='none';
  } 
}

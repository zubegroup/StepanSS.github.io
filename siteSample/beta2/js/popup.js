// Get modal element
var modal = document.getElementById('popModal');
//Get close modal button
var closeBtn = document.getElementById('closeModalBtn');

// Listen for close click
closeBtn.addEventListener('click', closeModal);
//Listen for outside modal content click
window.addEventListener('click', clickOutside);

// Get parametr from userSettings.js
var exitState = exitPopState;

// Function to open modal if cursor leave body
var modalState = true; //trigger to open modal one time only
$(document).mouseleave(function () {    
    if(modalState && exitState){
      modal.style.display = 'flex';
        modalState = false;
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

// Popup for mobile devices
$( document ).ready(function() {      
    var isMobile = window.matchMedia("only screen and (max-width: 770px)").matches;
    
    if(isMobile){
       window.history.pushState({page: 1}, "", "");

        window.onpopstate = function(event) {

          // "event" object seems to contain value only when the back button is clicked
          // and if the pop state event fires due to clicks on a button
          // or a link it comes up as "undefined" 

          if(event){
              // Code to handle back button or prevent from navigation
              modal.style.display = 'flex';
              modalState = false;
    //          console.log('mobile');
    //          alert('stop');
          }
          else{
            // Continue user action through link or button
          }
        } 
    }
    
    
//    //Switch Popup with delay
//    if (isMobile) {
//        if(modalState && exitState){
//            setTimeout(function(){
//        			modal.style.display = 'flex'
//     			}, 5000);
//            modalState = false;
//            console.log('mobile');
//        }
//    }
 });
// Get modal element
var modal = document.getElementById('lightboxBG');
//Get close modal button
var closeBtn = document.getElementById('closeModalBtn');

// Listen for close click
closeBtn.addEventListener('click', closeLightbox);
//Listen for outside modal content click
window.addEventListener('click', clickOutside);


//Function to show Background
function showBGlightbox(imgName){
    // set background in ligtbox-content
    $('.ligtbox-content').attr('style', 'background-image:'+imgName);
    // display lightbox section
    modal.style.display = 'flex';  
}

// Function to close modal
function closeLightbox(){
   modal.style.display = 'none';
}

// Function to close modal if outside click
function clickOutside(e){
  if(e.target==modal) {
      modal.style.display='none';
  } 
}












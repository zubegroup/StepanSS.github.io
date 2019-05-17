// Exit intent
function addEvent(obj, evt, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn);
  }
}

// Exit intent trigger
addEvent(document, 'mouseout', function(evt) {
  if (evt.toElement === null && evt.relatedTarget === null && !localStorage.getItem('exitintent_show')) {
    $.magnificPopup.open({
      items: {
        src: '#newsletter-form' //ID of inline element
      },
      type: 'inline',
      removalDelay: 500, //Delaying the removal in order to fit in the animation of the popup
      mainClass: 'mfp-fade mfp-fade-side', //The actual animation
    });
    //localStorage.setItem('exitintent_show', 'true'); // Set the flag in localStorage
  }
});


(() => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
})();

const loaderEl=document.querySelector('.loader');

window.addEventListener('load', () => {
  loaderEl.style.opacity='0';
  loaderEl.style.transition='all 2s';
  setTimeout(()=>{
    loaderEl.style.display='none';
  },500)
});
// const loaderEl = document.querySelector('.loader');: This line selects the spinner element from the DOM using the class loader.
// window.addEventListener('load', () => { ... });: This line adds an event listener to the window object, listening for the load event. When the event is triggered (i.e., when the website has finished loading), the code inside the callback function is executed.
// loaderEl.style.opacity = '0';: This line sets the opacity style property of the spinner element to 0, making it transparent and effectively hiding it from view. This creates a fade-out effect, making the spinner disappear smoothly.
// loaderEl.style.transition = 'all 2s';: This line sets the transition style property of the spinner element to all 2s, which means that any changes to the element's styles will be animated over a period of 2 seconds. This creates a smooth transition effect.
// setTimeout(() => { ... }, 500);: This line sets a timer to execute a function after a delay of 500 milliseconds (or 0.5 seconds).
// loaderEl.style.display = 'none';: This line sets the display style property of the spinner element to none, removing it from the layout and making it invisible.
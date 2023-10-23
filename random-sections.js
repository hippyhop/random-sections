/**
* Testing
* Random Sections
* Copyright Will-Myers.com
*/

class RandomSections {

constructor (el) {
   this.el = el;
  
  // Get Data Attributes
   this.sectionCount = this.el.getAttribute('data-sections') || '2';
   this.sectionCount = this.sectionCount.toLowerCase();
   this.sectionCount = this.sectionCount.trim();

   // Parent Section
   this.parentSection = this.el.closest('.page-section');

   // Array To Hold The Sections
   this.options = [];

   this.init();
}

init () {
  this.findParentSections();
  this.randomSection();
  this.fadeIn();
}
  
findParentSections() {  
   // Find Parent Sections
    for (let i = 0; i < this.sectionCount; i++) {
      this.options.push(this.parentSection);
      this.parentSection = this.parentSection.nextElementSibling;
    }
}
  
randomSection() {  

  //Get Random Section
  //Get Value from Local Storage
  //If Random Section Matches Local Storage, Get New Random Section
  //Save Random Number to Local Storage
  
  
  // Choose Random Section
  var section = Math.floor(Math.random() * this.options.length);
  let sessionData = parseInt(localStorage.getItem("lastSection"));

  console.log(section);
  console.log(sessionData);

  if (section === sessionData) {
    console.log("Matched Local Storage");
      while (section === sessionData) {
        var section = Math.floor(Math.random() * this.options.length);
      }
      console.log("Found New Section")
      this.options[section].classList.add("show-section");
  } 
  else {
    console.log('Not Matched Storage')
    this.options[section].classList.add("show-section");
  }
  
  localStorage.setItem("lastSection", section); 
  
  // Remove Others From DOM
  for (let option of this.options) {
    if (option.classList.contains('show-section')) {
       
    }
    else {
      option.remove();
    }
  }
// End of Function
}

fadeIn(){
  window.addEventListener('DOMContentLoaded', fadeIn);
  window.addEventListener('mercury:load', fadeIn);
  function fadeIn() {
    let body =  document.querySelector('body');
    body.classList.add('wm-show-page');
  }
}
  
// End of Class
}

(function(){
  // Find All Instances
  let allInstances = document.querySelectorAll('[data-wm-plugin="random-sections"]');
  
  // Loop Through All Instances
  for (let instance of allInstances) {
    new RandomSections(instance);
  }
}())


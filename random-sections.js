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
    this.isBackend = window.top !== window.self;
    this.isHeroSection = this.parentSection.matches('#sections > .page-section:first-child');
  
    // Array To Hold The Sections
    this.options = [];
    this.activeSection;
    
    this.init();
  }
  
  init () {
    this.findParentSections();
    this.randomSection();
    this.el.classList.add('loaded')
    //this.fadeIn();
  }
    
  findParentSections() {  
     // Find Parent Sections
      for (let i = 0; i < this.sectionCount; i++) {
        this.options.push(this.parentSection);
        if (this.isHeroSection) this.parentSection.classList.add('hero-random-section')
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
    console.log(section, sessionData);
    if (section === sessionData) {
      
      while (section === sessionData) {
        section = Math.floor(Math.random() * this.options.length);
      }
      this.options[section].classList.add("show-section");
      this.activeSection = this.options[section];
    } else {   
      this.options[section].classList.add("show-section");
      this.activeSection = this.options[section];
    }
    
    localStorage.setItem("lastSection", section); 
    
    // Remove Others From DOM
    
    for (let option of this.options) {
      if (!option.classList.contains('show-section') && !this.isBackend) {
        option.remove();
      } else if (!option.classList.contains('show-section') && this.isBackend){
        option.classList.add('hidden-random-section');
        this.getHeroSectionPadding();
        
      }
      
    }
  // End of Function
  }
  
  // fadeIn(){
  //   window.addEventListener('DOMContentLoaded', fadeIn);
  //   window.addEventListener('mercury:load', fadeIn);
  //   function fadeIn() {
  //     let body =  document.querySelector('body');
  //     body.classList.add('wm-show-page');
  //   }
  // }

  getHeroSectionPadding() {
    const firstSection = document.querySelector('#sections > .page-section:first-child');
    const setHeaderPadding = () => {
      const styles = window.getComputedStyle(firstSection)
      const paddingTop = styles.paddingTop;
      document.body.style.setProperty('--artificial-hero-top-padding', paddingTop);
      this.activeSection.classList.add('random-hero-section')
    }
    window.addEventListener('DOMContentLoaded', setHeaderPadding)
    window.addEventListener('load', setHeaderPadding)
    window.addEventListener('resize', setHeaderPadding)
  }
    
  // End of Class
}


window.initRandomSections = () => {
    // Find All Instances
  let allInstances = document.querySelectorAll('[data-wm-plugin="random-sections"]:not(.loaded)');
  
  // Loop Through All Instances
  for (let instance of allInstances) {
    new RandomSections(instance);
  }
  document.body.classList.add('wm-show-page');
}

window.initRandomSections();

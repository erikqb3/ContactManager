import { Directive, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appCloseDropDowns]'
})
export class CloseDropDownsDirective {
  @HostListener('click') closeDropDowns_function(){
    // let array = document.querySelectorAll("[appDropdown]");
    // array.forEach(element => {
    //   if (element.classList.contains('open')){
    //     console.log(element)
    //     element.classList.remove('open');
    //   }
    // });
  }
  constructor() { }

}

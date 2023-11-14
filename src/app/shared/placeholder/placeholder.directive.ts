import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // get info where the directive is used, create component where it is used....
  // add directive to DOM
  // exposed as public property
  constructor(public viewContainerRef: ViewContainerRef) {}

}

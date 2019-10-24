# ScrollSpyDirective

The ScrollSpy directive is used to automatically update (i.e. highlight or select) links in a navigation list based on scroll position.

## Installation
Either import whole LsnLibsModule or: 
```
import {LsnScrollSpyModule} from '@lsnova/angularmodules';

@NgModule({
  ...
  imports: [
    ...,
    LsnScrollSpyModule
  ],
  ...
})
export class AppModule {
}
```

## Usage example
In your template file:

```
<div imonitorScrollSpy
     [spySelector]="'div.spiedSection'"
     (spySectionChange)="onSpiedSectionChanged($event)"
     [scrollToSection]="scrollToObservable$">
     
     <div class="spiedSection" id="section1">....</div>
     
     <div class="spiedSection" id="section2">....</div>
     
     ....
          
     <div class="spiedSection" id="sectionX">....</div>
          
</div>
```
#### Available config options

| Feature                               | Notes                                                             | Default      |
|---------------------------------------|-------------------------------------------------------------------|--------------|
| `spySelector`                         | CSS selector used to select spied elements                        |   undefined  |
| `scrollToSection`                     | Enforce scrolling to section with given id                        |   undefined  |
| `spySectionChange(sectionId: string)` | Function invoked when a section is scrolled into. Section <br> id is passed as the function argument |   undefined  |
 

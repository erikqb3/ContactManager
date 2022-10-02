import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CMprogram';
  selectedFeature="contacts";

  switchView(feature:string){
    this.selectedFeature = feature;
  };
}

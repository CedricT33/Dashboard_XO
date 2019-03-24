import { Component, OnInit } from '@angular/core';
import { CollaborateursService } from './services/collaborateurs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private collaborateursService: CollaborateursService) {}

  ngOnInit() {
    this.collaborateursService.publishCollaborateurs();
  }

}

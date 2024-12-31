import { Component, Input } from '@angular/core';
import { Client } from '../../../models/budget.model';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent {
  @Input() client!: Client;
}
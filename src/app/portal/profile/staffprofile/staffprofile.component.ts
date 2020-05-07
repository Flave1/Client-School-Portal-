import { Component, OnInit } from '@angular/core';
import { PortalService } from 'src/app/shared/portal.service';

@Component({
  selector: 'app-staffprofile',
  templateUrl: './staffprofile.component.html',
  styleUrls: []
})
export class StaffprofileComponent implements OnInit {

  constructor(private portalService : PortalService) { }

  ngOnInit(): void {
  }

  
}

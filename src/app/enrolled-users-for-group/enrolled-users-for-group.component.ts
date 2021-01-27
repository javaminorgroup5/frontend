import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-enrolled-users-for-group',
  templateUrl: './enrolled-users-for-group.component.html',
  styleUrls: ['./enrolled-users-for-group.component.css']
})
export class EnrolledUsersForGroupComponent implements OnInit {
  userId?: number;
  groupId = -1;
  enrolled_users: [] = [];

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe( params => {
    this.groupService.getEnrolledUsersForGroup(parseInt(params.get('groupId') || '', undefined))
    .then((value) => {
      this.enrolled_users = value;
      
    })
  })
  
  }

}

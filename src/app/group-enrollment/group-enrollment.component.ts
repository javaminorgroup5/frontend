import { Component, OnInit } from '@angular/core';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-group-enrollment',
  templateUrl: './group-enrollment.component.html',
  styleUrls: ['./group-enrollment.component.css']
})
export class GroupEnrollmentComponent implements OnInit {
  group = '';

  constructor(
    private groupService: GroupService,

  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.groupService.getEnrolledGroupsForUser(parseInt(userId, 0)).then((value) => {
        this.group = value;
      });
    }
  }

}

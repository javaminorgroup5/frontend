import {Component, OnInit} from '@angular/core';
import { GroupService } from '../../service/group.service';
import {Group} from '../../model/group';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';
export {Group} from '../../model/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  userId: number;
  group: Group | undefined;
  isEnrolled: boolean[] = [];

  constructor(private groupService: GroupService,
              private router: Router,
              private commonService: CommonService) {
    this.userId = -1;
  }

  ngOnInit(): void {
    this.userId = this.commonService.NumberConverter(sessionStorage.getItem('userId'));
    this.groupService.getGroups().then((groups) => {
       for (const g of groups) {
         this.groupService.getEnrolledUsersForGroup(g.id).then( (users) => {
           if (users) {
              for (const user of users) {
                if (user.id === this.userId) {
                  g.isEnrolled = true;
                  break;
                }
              }
           }
         });
         this.groups.push(g);
       }
    });
    console.log('groups', this.groups);
  }

  async groupDetail(id: number): Promise<void> {
    this.router.navigate([`group/${id}`]);
  }

  enrollInGroup(id: number): void {
    if (!confirm('Weet je zeker dat je deze groep wilt betreden?')) {
      return;
    }
    this.groupService.enrollInGroup(id);
    window.location.reload();
  }

}

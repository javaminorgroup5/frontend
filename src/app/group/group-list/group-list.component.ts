import {Component, OnInit} from '@angular/core';
import { GroupService } from '../../service/group.service';
import {Group} from '../../model/group';
import {Router} from '@angular/router';
export {Group} from '../../model/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  userId: string;
  isEnrolled: boolean = true;

  constructor(private groupService: GroupService,
              private router: Router) {
    this.userId = '';
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    this.groupService.getGroups().then((value) => {
      this.groups = value;
    });
  }

  async groupDetail(id: number): Promise<void> {
    this.router.navigate([`group/${id}`]);
  }

  enrollInGroup(id: number): void {
    this.groupService.enrollInGroup(id);
  }
}

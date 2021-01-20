import {Component, OnDestroy, OnInit} from '@angular/core';
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
    this.router.navigate([`group/${id}`]).then(r => console.log(r));
  }

  enrollInGroup(group: Group): void {
    this.groupService.enrollInGroup(group.id)
    const groupname = group.groupName;
    alert("U bent nu lid van de " + groupname)
  }
}
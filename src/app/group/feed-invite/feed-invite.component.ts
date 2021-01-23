import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../service/common.service';
import {GroupService} from '../../service/group.service';
import {Alert} from '../../model/alert';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-feed-invite',
  templateUrl: './feed-invite.component.html',
  styleUrls: ['./feed-invite.component.css']
})
export class FeedInviteComponent implements OnInit {

  userId?: number;
  groupId = -1;
  alert?: Alert;
  inviteForm;
  users: User[] = [];
  profileAlert = false;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private groupService: GroupService,
              public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.activeModal = activeModal;
    this.inviteForm = this.formBuilder.group({
      userId: -1,
    });
  }

  ngOnInit(): void {
    this.commonService.groupSourceO$.subscribe(g => this.groupId = g.id);
    this.loadUsers();
  }

  generateGroupInviteViaFeed(value: any): void {
    if (!this.checkInviteFormValues(value.userId)) {
      return;
    }
    if (!confirm('Weet je zeker dat je een invite wilt versturen?')) {
      return;
    }
    console.log(this.groupId);
    if (this.groupId) {
      this.groupService.sendGeneratedGroupInviteToFeed(this.groupId, value.userId).then(({ token }) => {
        this.alert = {
          type: 'success',
          message: `Uitnodigingslink gegenereerd: http://localhost:4200/group/${this.groupId}?inviteToken=${token}`,
        };
      }).then(r => console.log(r));
    }
  }

  async loadUsers(): Promise<void> {
    // Remove yourself
    const userIdString = sessionStorage.getItem('userId');
    if (userIdString) {
      const userId = this.commonService.NumberConverter(userIdString);
      this.userService.getAllUsers().then(users => {
        users.forEach( (user: User) => {
          if (user.id !== userId) {
            this.users.push(user);
          }
        });
      });
    }
  }

  checkInviteFormValues(userId: number): boolean {
    this.profileAlert = false;
    if (!userId) {
      this.profileAlert = true;
      return false;
    }
    return true;
  }
}

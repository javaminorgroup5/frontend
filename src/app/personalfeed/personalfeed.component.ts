import { Component, OnInit } from '@angular/core';
import {Message} from '../model/message';
import {Group} from '../model/group';
import {FeedService} from '../service/feed.service';
import {ProfileService} from '../service/profile.service';
import {LikeService} from '../service/like.service';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Like} from '../model/Like';

@Component({
  selector: 'app-personalfeed',
  templateUrl: './personalfeed.component.html',
  styleUrls: ['./personalfeed.component.css']
})
export class PersonalfeedComponent implements OnInit {

  feed: Message[] = [];
  group: Group | undefined;
  timer: any;

  constructor(private feedService: FeedService,
              private profileService: ProfileService,
              private likeService: LikeService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.renderFeed();
  }

  async loadFeed(userId: number): Promise<Message[]> {
    return this.feedService.getPersonalFeed(userId);
  }

  renderFeed(): void {
    const userIdString = sessionStorage.getItem('userId');
    if (userIdString) {
      const userId = this.commonService.NumberConverter(userIdString);
      this.loadFeed(userId).then(async result => {
        for (const r of result) {
          r.image.picByte = 'data:image/jpeg;base64,' + r.image.picByte;
          this.loadProfileImage(r.userId).then(profile => {
            r.profileImage = {
              picByte: 'data:image/jpeg;base64,' + profile.image.picByte,
              type: profile.image.type,
              name: profile.image.name
            };
          });
        }
        this.feed = this.feed = result.slice().reverse();
      });
    }
  }

  recheckFeed(): any {
    this.router.navigate([this.router.url]);
  }

  async loadProfileImage(id: number): Promise<any> {
    return this.profileService.getProfile(id);
  }
}

import {Component, OnInit} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {Message} from '../model/message';
import {ProfileService} from '../service/profile.service';
import {LikeService} from '../service/like.service';
import {Like} from '../model/Like';
import {CommonService} from '../service/common.service';
import {Group} from '../model/group';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

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
    console.log(this.feed);
  }

  async loadFeed(groupId: number): Promise<Message[]> {
    return this.feedService.getFeedByGroup(groupId);
  }

  renderFeed(): void {
    console.log('renderFeed');
    this.commonService.groupSourceO$.subscribe(g => {
      this.loadFeed(g.id).then(async result => {
        for (const r of result) {
          r.image.picByte = 'data:image/jpeg;base64,' + r.image.picByte;
          this.getLikes(r.id).then(likes => {
            r.likes = likes;
          });

          this.loadProfileImage(r.userId).then(profile => {
            console.log(profile);
            r.profileImage = {
              picByte: 'data:image/jpeg;base64,' + profile.image.picByte,
              type: profile.image.type,
              name: profile.image.name
            };
          });
        }
        this.feed = this.feed = result.slice().reverse();
      });
    });
  }

  recheckFeed(): any {
    this.router.navigate([this.router.url]);
  }

  async loadProfileImage(id: number): Promise<any> {
    return this.profileService.getProfile(id);
  }

  async submitLike(messageId: number, recipeId: number): Promise<any> {
    const userIdString = sessionStorage.getItem('userId');
    if (userIdString) {
      const userId = this.commonService.NumberConverter(userIdString);
      const like: Like = {
        messageId,
        userId,
        recipeId,
      };
      this.likeService.toggleLike(like).then(r => console.log(r));
    }
    return this.ngOnInit();
  }

  async getLikes(messageId: number): Promise<Like[]> {
    return this.likeService.getLikeByMessageId(messageId);
  }
}

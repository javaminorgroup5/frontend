import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from '../../service/profile.service';
import {GroupCategory} from '../../model/group';
import {CategoryService} from '../../service/category.service';
import {CategoryEditComponent} from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  profile: any;
  isAdmin = false;
  categories: GroupCategory[] = [];

  constructor(private modalService: NgbModal,
              private profileService: ProfileService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileService.getProfile(parseInt(userId, 0)).then((value) => {
        this.profile = value;
        if (value.userRole === 'ADMIN') {
          this.isAdmin = true;
        }
      });
    }
    this.categoryService.getCategories().then((categories) => {
      this.categories = categories;
    });
  }
  openNewCategoryWindow(id?: number): void {
    const modalRef = this.modalService.open(CategoryEditComponent, { centered: true });
    modalRef.componentInstance.categoryId = id;
  }
}

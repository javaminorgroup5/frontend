import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryForm;
  categoryId = -1;
  editMode = false;
  categoryNameAlert = false;
  active: any;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
    this.activeModal = activeModal;
    this.categoryForm = this.formBuilder.group({
      name: '',
      active: -1
    });
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this.editMode = true;
      this.categoryService.getCategory(this.categoryId).then(r => {
        this.categoryForm = this.formBuilder.group({
          name: r.categoryName,
          active: -1
        });
      });
    }
  }

  checkCategoryValues(value: any): boolean {
    console.log(typeof value.active);
    if (value.active === 1) {
      this.active = true;
    }
    if (value.active === 2) {
      this.active = false;
    }
    this.categoryNameAlert = false;
    if (!value.name) {
      this.categoryNameAlert = true;
      return false;
    }
    return true;
  }

  createCategory(value: any): void {
    if (!this.checkCategoryValues(value)) {
      return;
    }
    if (this.editMode) {
      this.categoryService.editCategory( { categoryName: value.name, active: this.active } , this.categoryId).then(r => {
       console.log(r);
     });
      return;
    }
    this.categoryService.addCategory({categoryName: value.name}).then(r => {
      console.log(r);
    });
  }
}

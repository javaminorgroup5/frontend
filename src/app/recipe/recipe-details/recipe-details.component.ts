import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

1
import { HttpClient } from '@angular/common/http';

interface FormData {
  recipe: string;
  description: string;
}

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  selectedFile: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message = '';
  imageName: any;

  recipeForm;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
    // TODO
    private httpClient: HttpClient
  ) {
    this.recipeForm = this.formBuilder.group({
      recipe: '',
      description: ''
    });
  }

  public onFileChanged(event: any): void {
        this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }

      // Gets called when the user clicks on retieve image button to get the image from back end
  getImage(): void {
      // Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    }


  //
ngOnInit(): void {
  }

async onSubmit(formData: FormData): Promise<void> {
    try {
      console.log(formData.recipe);
      console.log(formData.description);
      console.log(this.selectedFile.name);
      const recipe: Recipe = {
        recipe: formData.recipe,
        description: formData.description,
      };
      const uploadImageData = new FormData();
      uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
      const recipeObjectString = JSON.stringify(recipe);
      const recipeBlob = new Blob([recipeObjectString], { type: 'application/json'});
      uploadImageData.append('recipe', recipeBlob);
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const result = await this.recipeService.addRecipe(parseInt(userId, 2), uploadImageData);
        if (result) {
          // TODO
          // this.router.navigate(['recipe/list']);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

}

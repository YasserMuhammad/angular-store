import { Component, Inject, OnInit } from '@angular/core';
import { AdminProductService } from '../../services/admin-product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/modules/store/interfaces/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stc-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories: string[] = [];
  productObj: IProduct | undefined;
  productForm: FormGroup = new FormGroup({});

  /**
   *  Live subscription list
   *
   * @type {(Subscription | undefined)}
   * @memberof AppComponent
   */
  subscriptionList: Subscription[] = [];

  constructor(
    private productService: AdminProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.getAllCategoties();
    this.initForm();
    this.data?.id ? this.getProductDetails() : '';
  }

  initForm() {
    this.productForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(4)]],
      price: [null, Validators.required],
      description: [null, Validators.required],
      image: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      category: [null, Validators.required],
    });
  }
  addProduct(form: FormGroup): void {
    this.subscriptionList.push(
      this.productService.addProduct(form.value).subscribe((res) => {
        console.log(res);
        this.dialogRef.close();
      })
    );
  }
  updateProduct(form: FormGroup): void {
    this.subscriptionList.push(
      this.productService
        .updateProduct(form.value, this.data.id)
        .subscribe((res) => {
          console.log(res);
          this.dialogRef.close();
        })
    );
  }

  getProductDetails() {
    this.subscriptionList.push(
      this.productService
        .getProductDetails(this.data.id)
        .subscribe((res: IProduct) => {
          console.log(res);
          this.productObj = res;
          this.fillProductData();
        })
    );
  }

  fillProductData() {
    Object.keys(this.productForm.controls).forEach((control) => {
      this.productForm.controls[control].setValue(
        this.productObj ? this.productObj[control as keyof IProduct] : null
      );
    });
  }
  getAllCategoties() {
    this.productService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res;
    });
  }
}

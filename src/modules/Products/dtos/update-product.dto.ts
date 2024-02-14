import { BaseProduct } from './base-product.dto';

export class UpdateProductDto extends BaseProduct {
  updatedAt: Date;
}

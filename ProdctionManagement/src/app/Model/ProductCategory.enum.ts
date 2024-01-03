export enum ProductCategory {
  Electronics,
  Clothing,
  Furniture,
  Books,
}

export namespace ProductCategory {
  export function mapFromValue(categoryValue: number): string {
    switch (categoryValue) {
      case ProductCategory.Electronics:
        return 'Electronics';
      case ProductCategory.Clothing:
        return 'Clothing';
      case ProductCategory.Furniture:
        return 'Furniture';
      case ProductCategory.Books:
        return 'Books';
      default:
        return 'Unknown';
    }
  }
}

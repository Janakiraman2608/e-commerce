export interface Cart{
  items: CartItem[]
}

export interface CartItem{
  productId: string
  quantity: number
}

export interface CartItemDetails{
  product: any;
  quantity: number;
}

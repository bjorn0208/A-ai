/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'açai' | 'combos' | 'adicionais';
  image: string; // Emoji representing the item
  sizeInput?: boolean; // Can choose size like 300ml, 500ml, 1L
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  addedToppings?: string[]; // customization toppings selected (for customized cups)
}

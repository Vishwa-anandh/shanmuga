/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  iconName: string;
  imageUrl: string;
  specs: Record<string, string>;
  stock: number;
  maxStock: number;
  features: string[];
  usageTips: string[];
}

export interface DiyProject {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro';
  timeNeeded: string;
  steps: string[];
  requiredItems: string[]; // references Product.id
  instructions: string;
}

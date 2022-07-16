export interface Product {
  id:          number;
  title:       string;
  price:       string;
  category:    string;
  description: string;
  image:       string;
}
export interface DetailsProduct {
  title:       string;
  category:    string;
  description: string;
  id:          string;
  image:       string;
  price:       string;
  rating:      Rating;
}

export interface Rating {
  count: string;
  rate:  string;
}

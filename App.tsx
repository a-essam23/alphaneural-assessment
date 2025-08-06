import * as React from 'react';
import './styles.css';
import axios from 'axios';
/*
  We want to hit this endpoint https://dummyjson.com/products for fetching some products and rendering them.
  
  The response will be in this format :-

  {
    "products": [
      {
         "id":1,
         "title":"iPhone 9",
         "price":549,
         "discountPercentage":12.96,
         "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      }
    ]
  }

  For each product, we want to render `thumbnail`, `title`, `price`, and `discounted price` (if applicable).

  If a product has a discount percentage:
    - Render the original price and give it a className of `strike`
    - Render the price after discount
  Otherwise:
    - Render the original price

  IGNORE styling, just focus on writing a FUNCTIONAL and READABLE code. Styling is already being taken care of.
*/

export default function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://dummyjson.com/products').then((res) => {
      setProducts(res.data.products);
      console.log(res.data.products);
    });
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {products.map((p) => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={p.thumbnail} alt={p.title} />
            <span>{p.title}</span>
            <span className={p.discountPercentage ? 'strike' : ''}>
              {p.price}
            </span>
            {p.discountPercentage && <span>{p.discountPercentage}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

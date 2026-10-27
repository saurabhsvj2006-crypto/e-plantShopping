
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', cost: 15, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400' },
      { id: 2, name: 'Peace Lily', cost: 18, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=401' },
      { id: 3, name: 'Spider Plant', cost: 12, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400' },
      { id: 4, name: 'Areca Palm', cost: 22, image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400' },
      { id: 5, name: 'Rubber Plant', cost: 20, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 6, name: 'Boston Fern', cost: 16, image: 'https://images.unsplash.com/photo-1597055181300-e3633a917d27?w=400' }
    ]
  },
  {
    category: 'Decorative Plants',
    plants: [
      { id: 7, name: 'Monstera', cost: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
      { id: 8, name: 'Calathea', cost: 19, image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=400' },
      { id: 9, name: 'Croton', cost: 17, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400' },
      { id: 10, name: 'Chinese Money Plant', cost: 14, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=401' },
      { id: 11, name: 'Fiddle Leaf Fig', cost: 30, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=401' },
      { id: 12, name: 'Philodendron', cost: 21, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400' }
    ]
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { id: 13, name: 'Aloe Vera', cost: 10, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=402' },
      { id: 14, name: 'Jade Plant', cost: 11, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=402' },
      { id: 15, name: 'Echeveria', cost: 8, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400' },
      { id: 16, name: 'Golden Barrel Cactus', cost: 13, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=403' },
      { id: 17, name: 'Haworthia', cost: 9, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=401' },
      { id: 18, name: 'String of Pearls', cost: 16, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=401' }
    ]
  }
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(previous => ({
      ...previous,
      [plant.name]: true
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" onClick={(event) => {
          event.preventDefault();
          onNavigate('home');
        }}>Home</a>

        <a href="#plants" onClick={(event) => {
          event.preventDefault();
          onNavigate('plants');
        }}>Plants</a>

        <a href="#cart" onClick={(event) => {
          event.preventDefault();
          onNavigate('cart');
        }}>
          Cart <span className="cart_quantity_count">{cartQuantity}</span>
        </a>
      </nav>

      <main className="plants-container" id="plants">
        <h1>Our Houseplants</h1>
        <p>Choose your favourite plants and bring nature home.</p>

        {plantsArray.map(category => (
          <section className="category-section" key={category.category}>
            <h2>{category.category}</h2>

            <div className="plants-grid">
              {category.plants.map(plant => (
                <article className="plant-card" key={plant.id}>
                  <img
                    className="plant-image"
                    src={plant.image}
                    alt={plant.name}
                  />

                  <h3>{plant.name}</h3>
                  <p>Price: ${plant.cost.toFixed(2)}</p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name]
                      ? 'Added to Cart'
                      : 'Add to Cart'}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export { plantsArray };
export default ProductList;

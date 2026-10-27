
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 15, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400' },
      { id: 2, name: 'Peace Lily', price: 18, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=401' },
      { id: 3, name: 'Spider Plant', price: 12, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400' },
      { id: 4, name: 'Areca Palm', price: 22, image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400' },
      { id: 5, name: 'Rubber Plant', price: 20, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400' },
      { id: 6, name: 'Boston Fern', price: 16, image: 'https://images.unsplash.com/photo-1597055181300-e3633a917d27?w=400' }
    ]
  },
  {
    category: 'Decorative Plants',
    plants: [
      { id: 7, name: 'Monstera', price: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
      { id: 8, name: 'Calathea', price: 19, image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=400' },
      { id: 9, name: 'Croton', price: 17, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400' },
      { id: 10, name: 'Chinese Money Plant', price: 14, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=401' },
      { id: 11, name: 'Fiddle Leaf Fig', price: 30, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=401' },
      { id: 12, name: 'Philodendron', price: 21, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400' }
    ]
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { id: 13, name: 'Aloe Vera', price: 10, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=402' },
      { id: 14, name: 'Jade Plant', price: 11, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=402' },
      { id: 15, name: 'Echeveria', price: 8, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400' },
      { id: 16, name: 'Golden Barrel Cactus', price: 13, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=403' },
      { id: 17, name: 'Haworthia', price: 9, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=401' },
      { id: 18, name: 'String of Pearls', price: 16, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=401' }
    ]
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav style={styles.navbar}>
        <a href="#home" style={styles.navLink}>Home</a>
        <a href="#plants" style={styles.navLink}>Plants</a>
        <a href="#cart" style={styles.navLink}>
          🛒 Cart ({totalItems})
        </a>
      </nav>

      <main id="plants" style={styles.container}>
        <h1>Paradise Nursery Plants</h1>
        <p>Bring nature home with our beautiful houseplants.</p>

        {plantCategories.map(group => (
          <section key={group.category} style={styles.category}>
            <h2>{group.category}</h2>

            <div style={styles.grid}>
              {group.plants.map(plant => {
                const isAdded = cartItems.some(
                  item => item.id === plant.id
                );

                return (
                  <article key={plant.id} style={styles.card}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={styles.image}
                    />

                    <h3>{plant.name}</h3>
                    <p>Price: ${plant.price.toFixed(2)}</p>

                    <button
                      onClick={() => dispatch(addItem(plant))}
                      disabled={isAdded}
                      style={{
                        ...styles.button,
                        backgroundColor: isAdded ? '#888' : '#2e7d32',
                        cursor: isAdded ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '18px',
    backgroundColor: '#245c35',
    position: 'sticky',
    top: 0
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  container: {
    padding: '24px',
    fontFamily: 'Arial, sans-serif'
  },
  category: {
    marginTop: '32px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px'
  },
  card: {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  button: {
    color: 'white',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '5px'
  }
};

export default ProductList;

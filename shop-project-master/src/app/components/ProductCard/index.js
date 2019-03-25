import React from 'react';
import PropTypes from 'prop-types';
import { TiShoppingCart } from 'react-icons/ti';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './index.scss';

function ProductCard({
  image,
  name,
  price,
  currencySymbol,
  id,
  isFavorite,
  cartCount,
  toggleFavorite,
  updateCartCount,
}) {
  return (
    <div className="Box--card">
      <img src={image} alt={name} />
      <div className="Box--card-content">
        <h1>{name}</h1>
        <p>{`${price}${currencySymbol}`}</p>
        <div className="Box--buttons">
          <TiShoppingCart />
          <input
            type="number"
            min={0}
            onChange={e => updateCartCount(id, e.target.value)}
            value={cartCount}
          />
          <button type="button" onClick={() => toggleFavorite(id)}>
            <span roles="img" aria-label="Add to Favorites">
              {isFavorite ? (
                <FaHeart style={{ color: 'red' }} />
              ) : (
                <FaRegHeart />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  cartCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};
ProductCard.defaultProps = { cartCount: 0, isFavorite: null };

export default ProductCard;

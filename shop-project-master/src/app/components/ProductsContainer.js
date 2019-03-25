import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 2rem;
  justify-content: center;
`;

ProductsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ProductsContainer.defaultProps = {
  className: '',
};

export default ProductsContainer;

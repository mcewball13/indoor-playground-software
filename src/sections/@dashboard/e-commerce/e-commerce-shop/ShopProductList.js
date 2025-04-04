import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ShopProductCard from './ShopProductCard';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

ShopProductList.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default function ShopProductList({ products, loading, handleAddToCart }) {
  return (
    <Scrollbar>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(12)] : products).map((product, index) =>
          product ? <ShopProductCard onClick={handleAddToCart} key={product.id} product={product} /> : <SkeletonProductItem key={index} />
        )}
      </Box>
    </Scrollbar>
  );
}

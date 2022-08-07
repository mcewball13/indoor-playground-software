import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
// redux
import { addCart, filterProducts, getProducts } from '../../redux/slices/product';
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// sections
import Iconify from '../../components/Iconify';
import {
    ShopProductList,
    ShopProductSearch, ShopTagFiltered
} from '../../sections/@dashboard/e-commerce/e-commerce-shop';

import ToolkitBar from '../../sections/@dashboard/pos-shop/ToolkitBar';
import { CartSidebar } from '../../sections/@dashboard/pos-shop';
import Layout from '../../layouts';

// ----------------------------------------------------------------------
const ICON_ARR = [
  'ic:outline-account-circle',
  'ic:baseline-repeat',
  'ic:outline-outbox',
  'ic:baseline-barcode',
  'ic:baseline-card-giftcard',
];

// Set values from categories in database
const FILTER_TABS = [
  {
    value: 'Admission',
    icon: <Iconify icon={ICON_ARR[0]} width={20} height={20} />,
  },
  {
    value: 'Classes',
    icon: <Iconify icon={ICON_ARR[0]} width={20} height={20} />,
  },
  {
    value: 'Clothing',
    icon: <Iconify icon={ICON_ARR[0]} width={20} height={20} />,
  },
  {
    value: 'Events',
    icon: <Iconify icon={ICON_ARR[0]} width={20} height={20} />,
  },
  {
    value: 'Snacks',
    icon: <Iconify icon={ICON_ARR[0]} width={20} height={20} />,
  },
];
POSCart.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default function POSCart() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const [currentTab, setCurrentTab] = useState('Admission');

  const { products, sortBy, filters } = useSelector((state) => state.product);
  console.log('products', products);

  const filteredProducts = applyFilter(products, sortBy, filters);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    handleCloseFilter();
  };

  const handleRemoveGender = (value) => {
    const newValue = filters.gender.filter((item) => item !== value);
    setValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };

  const handleRemoveColor = (value) => {
    const newValue = filters.colors.filter((item) => item !== value);
    setValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setValue('priceRange', '');
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
  };

  const handleAddToCart = (product) => () => {
    console.log('product', product);
    dispatch(addCart(product));
  }

  return (
    <Page title="POS: Cart">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Register"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Shop' },
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
            {FILTER_TABS.map((item) => (
              <Tab disableRipple key={item.value} label={item.value} value={item.value} />
            ))}
          </Tabs>

          <ShopProductSearch />
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack>
        <Grid container spacing={2} direction="column">
          <Grid container item direction="row" spacing={2}>
            <Grid item xs={12} sm={8} sx={{ height: '60vh' }}>
              <ShopProductList handleAddToCart={handleAddToCart} products={filteredProducts} loading={!products.length && isDefault} />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ height: '60vh' }}>
              <CartSidebar />
            </Grid>
          </Grid>
          <ToolkitBar iconArr={ICON_ARR} />
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = products.filter((product) => filters.gender.includes(product.gender));
  }
  if (filters.category !== 'All') {
    products = products.filter((product) => product.category === filters.category);
  }
  if (filters.colors.length > 0) {
    products = products.filter((product) => product.colors.some((color) => filters.colors.includes(color)));
  }
  if (filters.priceRange) {
    products = products.filter((product) => {
      if (filters.priceRange === 'below') {
        return product.price < 25;
      }
      if (filters.priceRange === 'between') {
        return product.price >= 25 && product.price <= 75;
      }
      return product.price > 75;
    });
  }
  if (filters.rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

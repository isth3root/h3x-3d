import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '../data/products';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const mockProduct: Product = {
  id: 'prod-1',
  name: { en: 'Test Product', fa: 'محصول تستی' },
  description: { en: 'Test Description', fa: 'توضیحات تستی' },
  images: ['/test.jpg'],
  category: { en: 'Test Category', fa: 'دسته تستی' },
  featured: true,
  materials: ['PLA', 'ABS'],
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{component}</BrowserRouter>
    </I18nextProvider>
  );
};

describe('ProductCard component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('should render product information', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name.en)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description.en)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category.en)).toBeInTheDocument();
  });

  it('should link the image to the product page', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText(mockProduct.name.en);
    expect(image.closest('a')).toHaveAttribute('href', `/product/${mockProduct.id}`);
  });
});

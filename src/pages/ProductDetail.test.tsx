import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { products } from '../data/products';
import { saveUser } from '../utils/auth';

const renderWithProviders = (component: React.ReactElement, initialEntry: string) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/product/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>
  );
};

describe('ProductDetail component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    // Mock user as logged in for these tests
    saveUser('1234567890');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should display add to cart button when product is not in cart', () => {
    const product = products[0];
    renderWithProviders(<ProductDetail />, `/product/${product.id}`);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should show quantity controls when product is in cart', () => {
    const product = products[0];
    renderWithProviders(<ProductDetail />, `/product/${product.id}`);

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(screen.getByText('in cart')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /minus/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /plus/i })).toBeInTheDocument();
  });

  it('should not allow quantity to exceed 5', () => {
    const product = products[0];
    renderWithProviders(<ProductDetail />, `/product/${product.id}`);

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    const plusButton = screen.getByRole('button', { name: /plus/i });

    for (let i = 0; i < 4; i++) {
      fireEvent.click(plusButton);
    }

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(plusButton).toBeDisabled();
    expect(screen.getByText('For orders of more than 5, please contact us.')).toBeInTheDocument();
  });
});

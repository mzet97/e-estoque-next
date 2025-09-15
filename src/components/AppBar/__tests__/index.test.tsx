import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import NavBar from '../index';
import theme from '@/theme/theme';

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('NavBar', () => {
  const mockOnMenuClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the navbar with all elements', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      // Check if the main elements are rendered
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('E-Chamado')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText('menu')).toBeInTheDocument();
    });

    it('should render the menu icon button', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const menuButton = screen.getByLabelText('menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-label', 'menu');
    });

    it('should render the title correctly', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const title = screen.getByText('E-Chamado');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('DIV');
    });

    it('should render the login button', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const loginButton = screen.getByText('Login');
      expect(loginButton).toBeInTheDocument();
      expect(loginButton.tagName).toBe('BUTTON');
    });
  });

  describe('Interactions', () => {
    it('should call onMenuClick when menu button is clicked', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);

      expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
    });

    it('should call onMenuClick multiple times when menu button is clicked multiple times', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);
      fireEvent.click(menuButton);
      fireEvent.click(menuButton);

      expect(mockOnMenuClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onMenuClick when other elements are clicked', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const title = screen.getByText('E-Chamado');
      const loginButton = screen.getByText('Login');

      fireEvent.click(title);
      fireEvent.click(loginButton);

      expect(mockOnMenuClick).not.toHaveBeenCalled();
    });
  });

  describe('Props', () => {
    it('should accept and use the onMenuClick prop', () => {
      const customMockFunction = jest.fn();
      renderWithTheme(<NavBar onMenuClick={customMockFunction} />);

      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);

      expect(customMockFunction).toHaveBeenCalledTimes(1);
      expect(mockOnMenuClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const menuButton = screen.getByLabelText('menu');
      expect(menuButton).toHaveAttribute('aria-label', 'menu');
    });

    it('should have proper semantic structure', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      // AppBar should render as banner landmark
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Title should be present
      const title = screen.getByText('E-Chamado');
      expect(title).toBeInTheDocument();
      
      // Buttons should be accessible
      expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const menuButton = screen.getByLabelText('menu');
      
      // Focus the menu button
      menuButton.focus();
      expect(document.activeElement).toBe(menuButton);
      
      // Simulate Enter key press
      fireEvent.keyDown(menuButton, { key: 'Enter', code: 'Enter' });
      // Note: MUI IconButton handles Enter key internally
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct Material-UI styling classes', () => {
      renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);

      const appBar = screen.getByRole('banner');
      expect(appBar).toHaveClass('MuiAppBar-root');
      
      const toolbar = appBar.querySelector('.MuiToolbar-root');
      expect(toolbar).toBeInTheDocument();
    });

    it('should have proper component structure', () => {
      const { container } = renderWithTheme(<NavBar onMenuClick={mockOnMenuClick} />);
      
      // Check if the structure is correct: AppBar > Toolbar > (IconButton, Typography, Button)
      const appBar = container.querySelector('.MuiAppBar-root');
      const toolbar = appBar?.querySelector('.MuiToolbar-root');
      const iconButton = toolbar?.querySelector('.MuiIconButton-root');
      const typography = toolbar?.querySelector('.MuiTypography-root');
      const button = toolbar?.querySelector('.MuiButton-root');
      
      expect(appBar).toBeInTheDocument();
      expect(toolbar).toBeInTheDocument();
      expect(iconButton).toBeInTheDocument();
      expect(typography).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined onMenuClick gracefully', () => {
      // TypeScript would prevent this, but testing runtime behavior
      const { container } = render(
        <ThemeProvider theme={theme}>
          <NavBar onMenuClick={undefined as any} />
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render correctly when re-rendered with different props', () => {
      const firstMockFunction = jest.fn();
      const secondMockFunction = jest.fn();
      
      const { rerender } = renderWithTheme(<NavBar onMenuClick={firstMockFunction} />);
      
      let menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);
      expect(firstMockFunction).toHaveBeenCalledTimes(1);
      
      rerender(
        <ThemeProvider theme={theme}>
          <NavBar onMenuClick={secondMockFunction} />
        </ThemeProvider>
      );
      
      menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);
      expect(secondMockFunction).toHaveBeenCalledTimes(1);
      expect(firstMockFunction).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });
});
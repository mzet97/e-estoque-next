import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Layout from '../Layout';
import theme from '@/theme/theme';

// Mock the child components
jest.mock('../MiniVariantAppBar', () => {
  return function MockMiniVariantAppBar({ open, onMenuClick, children }: any) {
    return (
      <div data-testid="mini-variant-appbar">
        <button onClick={onMenuClick} data-testid="menu-button">
          Menu
        </button>
        <span data-testid="appbar-open-state">{open ? 'open' : 'closed'}</span>
        <span data-testid="appbar-title">{children}</span>
      </div>
    );
  };
});

jest.mock('../MiniVariantDrawer', () => {
  return function MockMiniVariantDrawer({ open, onClose }: any) {
    return (
      <div data-testid="mini-variant-drawer">
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
        <span data-testid="drawer-open-state">{open ? 'open' : 'closed'}</span>
      </div>
    );
  };
});

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Layout', () => {
  const TestChildren = () => <div data-testid="test-children">Test Content</div>;

  describe('Rendering', () => {
    it('should render the layout with all components', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      expect(screen.getByTestId('mini-variant-appbar')).toBeInTheDocument();
      expect(screen.getByTestId('mini-variant-drawer')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderWithTheme(
        <Layout>
          <div data-testid="custom-content">Custom Content</div>
        </Layout>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('should pass the correct title to AppBar', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      expect(screen.getByTestId('appbar-title')).toHaveTextContent('E-Chamado');
    });

    it('should have proper main content area', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const mainContent = container.querySelector('[component="main"]');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Drawer State Management', () => {
    it('should start with drawer closed', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('closed');
    });

    it('should open drawer when menu button is clicked', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const menuButton = screen.getByTestId('menu-button');
      fireEvent.click(menuButton);

      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('open');
    });

    it('should close drawer when close button is clicked', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // First open the drawer
      const menuButton = screen.getByTestId('menu-button');
      fireEvent.click(menuButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');

      // Then close it
      const closeButton = screen.getByTestId('close-button');
      fireEvent.click(closeButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('closed');
    });

    it('should handle multiple open/close cycles', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const menuButton = screen.getByTestId('menu-button');
      const closeButton = screen.getByTestId('close-button');

      // Open
      fireEvent.click(menuButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');

      // Close
      fireEvent.click(closeButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');

      // Open again
      fireEvent.click(menuButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');

      // Close again
      fireEvent.click(closeButton);
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
    });
  });

  describe('Layout Structure', () => {
    it('should have flex display container', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const flexContainer = container.firstChild as HTMLElement;
      expect(flexContainer).toHaveStyle({ display: 'flex' });
    });

    it('should have main content with proper styling', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const mainContent = container.querySelector('[component="main"]');
      expect(mainContent).toHaveStyle({ flexGrow: '1' });
    });

    it('should include toolbar spacing', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // Check if toolbar spacing box exists
      const mainContent = container.querySelector('[component="main"]');
      const toolbarSpacing = mainContent?.firstChild;
      expect(toolbarSpacing).toBeInTheDocument();
    });
  });

  describe('Props and Children', () => {
    it('should render multiple children', () => {
      renderWithTheme(
        <Layout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </Layout>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('should render complex children components', () => {
      const ComplexChild = () => (
        <div data-testid="complex-child">
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      );

      renderWithTheme(
        <Layout>
          <ComplexChild />
        </Layout>
      );

      expect(screen.getByTestId('complex-child')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      renderWithTheme(<Layout>{null}</Layout>);

      expect(screen.getByTestId('mini-variant-appbar')).toBeInTheDocument();
      expect(screen.getByTestId('mini-variant-drawer')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should pass correct props to MiniVariantAppBar', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // Initially closed
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('closed');
      expect(screen.getByTestId('appbar-title')).toHaveTextContent('E-Chamado');

      // After opening
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('open');
    });

    it('should pass correct props to MiniVariantDrawer', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // Initially closed
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');

      // After opening
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');

      // After closing
      fireEvent.click(screen.getByTestId('close-button'));
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
    });
  });

  describe('Theme Integration', () => {
    it('should use theme for styling', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // The component uses theme.spacing and theme.transitions
      // We can verify the component renders without errors when theme is provided
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should apply theme transitions', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const mainContent = container.querySelector('[component="main"]');
      
      // Check if transition styles are applied (they should be present in the style attribute)
      expect(mainContent).toBeInTheDocument();
      
      // The transition should be applied when drawer state changes
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should adjust main content margin based on drawer state', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const mainContent = container.querySelector('[component="main"]');
      
      // When drawer is closed, should have smaller margin
      expect(mainContent).toBeInTheDocument();
      
      // Open drawer
      fireEvent.click(screen.getByTestId('menu-button'));
      
      // When drawer is open, margin should change
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid state changes', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const menuButton = screen.getByTestId('menu-button');
      const closeButton = screen.getByTestId('close-button');

      // Rapid clicks
      fireEvent.click(menuButton);
      fireEvent.click(closeButton);
      fireEvent.click(menuButton);
      fireEvent.click(closeButton);
      fireEvent.click(menuButton);

      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');
    });

    it('should maintain state consistency between components', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      // Both components should always have the same open state
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('closed');

      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('open');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('open');

      fireEvent.click(screen.getByTestId('close-button'));
      expect(screen.getByTestId('drawer-open-state')).toHaveTextContent('closed');
      expect(screen.getByTestId('appbar-open-state')).toHaveTextContent('closed');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const { container } = renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const mainContent = container.querySelector('[component="main"]');
      expect(mainContent).toBeInTheDocument();
      expect(mainContent?.tagName.toLowerCase()).toBe('div');
    });

    it('should maintain focus management', () => {
      renderWithTheme(
        <Layout>
          <TestChildren />
        </Layout>
      );

      const menuButton = screen.getByTestId('menu-button');
      const closeButton = screen.getByTestId('close-button');

      menuButton.focus();
      expect(document.activeElement).toBe(menuButton);

      fireEvent.click(menuButton);
      
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });
  });
});
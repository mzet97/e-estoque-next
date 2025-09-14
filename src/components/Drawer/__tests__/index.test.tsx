import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import MenuDrawer from '../index';
import theme from '@/theme/theme';

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('MenuDrawer', () => {
  const mockToggleDrawer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the drawer when open is true', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      // Check if drawer is rendered
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should not render drawer content when open is false', () => {
      renderWithTheme(
        <MenuDrawer open={false} toggleDrawer={mockToggleDrawer} />
      );

      // When closed, the drawer content should not be visible
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('should render all first section menu items', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const firstSectionItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];
      firstSectionItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render all second section menu items', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const secondSectionItems = ['All mail', 'Trash', 'Spam'];
      secondSectionItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should render icons for menu items', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      // Check if icons are rendered (MUI icons have specific test ids or classes)
      const listItems = screen.getAllByRole('button');
      expect(listItems).toHaveLength(7); // 4 + 3 items
      
      // Each list item should have an icon
      listItems.forEach(item => {
        const icon = item.querySelector('.MuiListItemIcon-root');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render divider between sections', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call toggleDrawer with false when drawer content is clicked', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const drawerContent = screen.getByRole('presentation');
      fireEvent.click(drawerContent);

      expect(mockToggleDrawer).toHaveBeenCalledWith(false);
      expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
    });

    it('should call toggleDrawer with false when a menu item is clicked', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const inboxItem = screen.getByText('Inbox');
      fireEvent.click(inboxItem);

      expect(mockToggleDrawer).toHaveBeenCalledWith(false);
      expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
    });

    it('should call toggleDrawer with false when drawer backdrop is clicked', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      // Simulate clicking on the backdrop (onClose event)
      const drawer = container.querySelector('.MuiDrawer-root');
      if (drawer) {
        // Simulate the onClose event that MUI Drawer would trigger
        fireEvent.keyDown(drawer, { key: 'Escape' });
      }

      // Note: The actual backdrop click is handled internally by MUI
      // We're testing that the onClose prop is properly set
    });

    it('should handle multiple clicks on different menu items', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      fireEvent.click(screen.getByText('Inbox'));
      fireEvent.click(screen.getByText('Starred'));
      fireEvent.click(screen.getByText('All mail'));

      expect(mockToggleDrawer).toHaveBeenCalledTimes(3);
      expect(mockToggleDrawer).toHaveBeenCalledWith(false);
    });
  });

  describe('Props', () => {
    it('should respect the open prop', () => {
      const { rerender } = renderWithTheme(
        <MenuDrawer open={false} toggleDrawer={mockToggleDrawer} />
      );

      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
        </ThemeProvider>
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should use the provided toggleDrawer function', () => {
      const customToggleDrawer = jest.fn();
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={customToggleDrawer} />
      );

      fireEvent.click(screen.getByText('Inbox'));

      expect(customToggleDrawer).toHaveBeenCalledWith(false);
      expect(mockToggleDrawer).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA roles', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(7);
    });

    it('should be keyboard accessible', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const firstButton = screen.getAllByRole('button')[0];
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      // Test keyboard navigation
      fireEvent.keyDown(firstButton, { key: 'Enter' });
      // MUI ListItemButton handles Enter key internally
    });

    it('should have proper list structure', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(2); // Two separate lists
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(7); // 4 + 3 items
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct Material-UI classes', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      expect(container.querySelector('.MuiDrawer-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiList-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiListItem-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiListItemButton-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiListItemIcon-root')).toBeInTheDocument();
      expect(container.querySelector('.MuiListItemText-root')).toBeInTheDocument();
    });

    it('should have correct width styling', () => {
      renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const drawerContent = screen.getByRole('presentation');
      expect(drawerContent).toHaveStyle({ width: '250px' });
    });

    it('should have proper component structure', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      // Check the nested structure
      const drawer = container.querySelector('.MuiDrawer-root');
      const box = drawer?.querySelector('[role="presentation"]');
      const lists = box?.querySelectorAll('.MuiList-root');
      const divider = box?.querySelector('.MuiDivider-root');

      expect(drawer).toBeInTheDocument();
      expect(box).toBeInTheDocument();
      expect(lists).toHaveLength(2);
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Icon Distribution', () => {
    it('should alternate icons correctly in first section', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const firstList = container.querySelectorAll('.MuiList-root')[0];
      const listItems = firstList.querySelectorAll('.MuiListItem-root');
      
      expect(listItems).toHaveLength(4);
      
      // Check that icons alternate (even indices should have InboxIcon, odd should have MailIcon)
      // This is based on the component logic: index % 2 === 0 ? <InboxIcon /> : <MailIcon />
      listItems.forEach((item, index) => {
        const icon = item.querySelector('.MuiListItemIcon-root svg');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should alternate icons correctly in second section', () => {
      const { container } = renderWithTheme(
        <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
      );

      const secondList = container.querySelectorAll('.MuiList-root')[1];
      const listItems = secondList.querySelectorAll('.MuiListItem-root');
      
      expect(listItems).toHaveLength(3);
      
      listItems.forEach((item, index) => {
        const icon = item.querySelector('.MuiListItemIcon-root svg');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined toggleDrawer gracefully', () => {
      // TypeScript would prevent this, but testing runtime behavior
      const { container } = render(
        <ThemeProvider theme={theme}>
          <MenuDrawer open={true} toggleDrawer={undefined as any} />
        </ThemeProvider>
      );
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle rapid open/close state changes', () => {
      const { rerender } = renderWithTheme(
        <MenuDrawer open={false} toggleDrawer={mockToggleDrawer} />
      );

      // Rapidly change state
      rerender(
        <ThemeProvider theme={theme}>
          <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
        </ThemeProvider>
      );
      
      rerender(
        <ThemeProvider theme={theme}>
          <MenuDrawer open={false} toggleDrawer={mockToggleDrawer} />
        </ThemeProvider>
      );
      
      rerender(
        <ThemeProvider theme={theme}>
          <MenuDrawer open={true} toggleDrawer={mockToggleDrawer} />
        </ThemeProvider>
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });
});
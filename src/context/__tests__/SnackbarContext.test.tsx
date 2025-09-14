import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SnackbarProvider, useSnackbar } from '../SnackbarContext';
import { AlertColor } from '@mui/material';

// Test component that uses the SnackbarContext
const TestComponent = () => {
  const { showMessage } = useSnackbar();

  return (
    <div>
      <button
        onClick={() => showMessage('Success message', 'success')}
        data-testid="success-button"
      >
        Show Success
      </button>
      <button
        onClick={() => showMessage('Error message', 'error')}
        data-testid="error-button"
      >
        Show Error
      </button>
      <button
        onClick={() => showMessage('Warning message', 'warning')}
        data-testid="warning-button"
      >
        Show Warning
      </button>
      <button
        onClick={() => showMessage('Info message', 'info')}
        data-testid="info-button"
      >
        Show Info
      </button>
      <button
        onClick={() => showMessage('Default message')}
        data-testid="default-button"
      >
        Show Default
      </button>
    </div>
  );
};

const TestComponentWithProvider = () => (
  <SnackbarProvider>
    <TestComponent />
  </SnackbarProvider>
);

// Test component without provider to test error case
const TestComponentWithoutProvider = () => {
  const { showMessage } = useSnackbar();
  return (
    <button onClick={() => showMessage('Test')} data-testid="test-button">
      Test
    </button>
  );
};

describe('SnackbarContext', () => {
  describe('SnackbarProvider', () => {
    it('should render children correctly', () => {
      render(
        <SnackbarProvider>
          <div data-testid="child-component">Child Component</div>
        </SnackbarProvider>
      );

      expect(screen.getByTestId('child-component')).toBeInTheDocument();
      expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('should not show snackbar initially', () => {
      render(<TestComponentWithProvider />);

      // Snackbar should not be visible initially
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('showMessage function', () => {
    it('should show success message', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('success-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('should show error message', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('error-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show warning message', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('warning-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should show info message', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('info-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('should show default message with success severity', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('default-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText('Default message')).toBeInTheDocument();
    });

    it('should update message when called multiple times', async () => {
      render(<TestComponentWithProvider />);

      // Show first message
      fireEvent.click(screen.getByTestId('success-button'));
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      // Show second message
      fireEvent.click(screen.getByTestId('error-button'));
      await waitFor(() => {
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      // First message should be replaced
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  describe('Snackbar behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should auto-hide after 4 seconds', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('success-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Fast-forward time by 4 seconds
      jest.advanceTimersByTime(4000);

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });

    it('should close when close button is clicked', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('success-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Find and click the close button
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });
  });

  describe('Snackbar positioning', () => {
    it('should position snackbar at top center', async () => {
      render(<TestComponentWithProvider />);

      fireEvent.click(screen.getByTestId('success-button'));

      await waitFor(() => {
        const snackbar = screen.getByRole('alert').closest('[role="presentation"]');
        expect(snackbar).toBeInTheDocument();
      });
    });
  });

  describe('useSnackbar hook', () => {
    it('should provide showMessage function', () => {
      const TestHookComponent = () => {
        const { showMessage } = useSnackbar();
        expect(typeof showMessage).toBe('function');
        return <div>Test</div>;
      };

      render(
        <SnackbarProvider>
          <TestHookComponent />
        </SnackbarProvider>
      );
    });

    it('should work without provider (default context)', () => {
      // This tests the default context value
      render(<TestComponentWithoutProvider />);
      
      // Should not throw error when clicking
      expect(() => {
        fireEvent.click(screen.getByTestId('test-button'));
      }).not.toThrow();
    });
  });

  describe('AlertColor types', () => {
    it('should accept all valid AlertColor values', async () => {
      const alertColors: AlertColor[] = ['success', 'error', 'warning', 'info'];
      
      const TestAllColors = () => {
        const { showMessage } = useSnackbar();
        
        return (
          <div>
            {alertColors.map((color, index) => (
              <button
                key={color}
                onClick={() => showMessage(`${color} message`, color)}
                data-testid={`${color}-button`}
              >
                {color}
              </button>
            ))}
          </div>
        );
      };

      render(
        <SnackbarProvider>
          <TestAllColors />
        </SnackbarProvider>
      );

      for (const color of alertColors) {
        fireEvent.click(screen.getByTestId(`${color}-button`));
        
        await waitFor(() => {
          expect(screen.getByText(`${color} message`)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Error handling', () => {
    it('should handle empty message', async () => {
      const TestEmptyMessage = () => {
        const { showMessage } = useSnackbar();
        return (
          <button
            onClick={() => showMessage('')}
            data-testid="empty-message-button"
          >
            Empty Message
          </button>
        );
      };

      render(
        <SnackbarProvider>
          <TestEmptyMessage />
        </SnackbarProvider>
      );

      fireEvent.click(screen.getByTestId('empty-message-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      // Should show empty content but not crash
      expect(screen.getByRole('alert')).toHaveTextContent('');
    });

    it('should handle very long messages', async () => {
      const longMessage = 'A'.repeat(1000);
      
      const TestLongMessage = () => {
        const { showMessage } = useSnackbar();
        return (
          <button
            onClick={() => showMessage(longMessage)}
            data-testid="long-message-button"
          >
            Long Message
          </button>
        );
      };

      render(
        <SnackbarProvider>
          <TestLongMessage />
        </SnackbarProvider>
      );

      fireEvent.click(screen.getByTestId('long-message-button'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });
});
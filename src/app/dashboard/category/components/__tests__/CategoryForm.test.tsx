import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryForm from '../CategoryForm';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { Category } from '../../types/Category';
import * as categoryService from '../../api/categoryService';

// Mock the category service
jest.mock('../../api/categoryService', () => ({
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
}));

// Mock the snackbar context
jest.mock('@/context/SnackbarContext', () => ({
  ...jest.requireActual('@/context/SnackbarContext'),
  useSnackbar: () => ({
    showMessage: jest.fn(),
  }),
}));

const mockCreateCategory = categoryService.createCategory as jest.MockedFunction<typeof categoryService.createCategory>;
const mockUpdateCategory = categoryService.updateCategory as jest.MockedFunction<typeof categoryService.updateCategory>;

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <SnackbarProvider>
      {ui}
    </SnackbarProvider>
  );
};

const mockCategory: Category = {
  id: '1',
  name: 'Test Category',
  description: 'Test Description',
  shortDescription: 'Short Desc',
};

describe('CategoryForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateCategory.mockResolvedValue(mockCategory);
    mockUpdateCategory.mockResolvedValue(mockCategory);
  });

  describe('Rendering', () => {
    it('should render with default title', () => {
      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByText('Category Form')).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      renderWithProvider(
        <CategoryForm
          title="Custom Category Form"
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByText('Custom Category Form')).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/short description/i)).toBeInTheDocument();
    });

    it('should render submit and cancel buttons', () => {
      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });
  });

  describe('Form initialization', () => {
    it('should initialize with empty values when no initial category', () => {
      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
      const shortDescriptionInput = screen.getByLabelText(/short description/i) as HTMLInputElement;

      expect(nameInput.value).toBe('');
      expect(descriptionInput.value).toBe('');
      expect(shortDescriptionInput.value).toBe('');
    });

    it('should initialize with initial category values', () => {
      renderWithProvider(
        <CategoryForm
          initialCategory={mockCategory}
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
      const shortDescriptionInput = screen.getByLabelText(/short description/i) as HTMLInputElement;

      expect(nameInput.value).toBe(mockCategory.name);
      expect(descriptionInput.value).toBe(mockCategory.description);
      expect(shortDescriptionInput.value).toBe(mockCategory.shortDescription);
    });

    it('should update form when initialCategory prop changes', () => {
      const { rerender } = renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      expect(nameInput.value).toBe('');

      rerender(
        <SnackbarProvider>
          <CategoryForm
            initialCategory={mockCategory}
            onSuccess={mockOnSuccess}
            onCancel={mockOnCancel}
          />
        </SnackbarProvider>
      );

      expect(nameInput.value).toBe(mockCategory.name);
    });
  });

  describe('Form validation', () => {
    it('should show validation errors for empty required fields', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for name too short', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'A');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for name too long', async () => {
      const user = userEvent.setup();
      const longName = 'A'.repeat(101);

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, longName);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name must be at most 100 characters/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for description too long', async () => {
      const user = userEvent.setup();
      const longDescription = 'A'.repeat(501);

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(nameInput, 'Valid Name');
      await user.type(descriptionInput, longDescription);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/description must be at most 500 characters/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for short description too long', async () => {
      const user = userEvent.setup();
      const longShortDescription = 'A'.repeat(201);

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      const shortDescriptionInput = screen.getByLabelText(/short description/i);

      await user.type(nameInput, 'Valid Name');
      await user.type(shortDescriptionInput, longShortDescription);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/short description must be at most 200 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form submission - Create', () => {
    it('should create category with valid data', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const shortDescriptionInput = screen.getByLabelText(/short description/i);

      await user.type(nameInput, 'New Category');
      await user.type(descriptionInput, 'New Description');
      await user.type(shortDescriptionInput, 'New Short Desc');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalledWith({
          name: 'New Category',
          description: 'New Description',
          shortDescription: 'New Short Desc',
        });
      });

      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    it('should handle create category error', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockCreateCategory.mockRejectedValue(new Error('Network error'));

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'New Category');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalled();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Erro ao salvar categoria:', expect.any(Error));
      expect(mockOnSuccess).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Form submission - Update', () => {
    it('should update category with valid data', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          initialCategory={mockCategory}
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Category');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateCategory).toHaveBeenCalledWith(mockCategory.id, {
          id: mockCategory.id,
          name: 'Updated Category',
          description: mockCategory.description,
          shortDescription: mockCategory.shortDescription,
        });
      });

      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    it('should handle update category error', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockUpdateCategory.mockRejectedValue(new Error('Network error'));

      renderWithProvider(
        <CategoryForm
          initialCategory={mockCategory}
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Category');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateCategory).toHaveBeenCalled();
      });

      expect(consoleSpy).toHaveBeenCalledWith('Erro ao salvar categoria:', expect.any(Error));
      expect(mockOnSuccess).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Form interactions', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should allow typing in all form fields', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      const shortDescriptionInput = screen.getByLabelText(/short description/i);

      await user.type(nameInput, 'Test Name');
      await user.type(descriptionInput, 'Test Description');
      await user.type(shortDescriptionInput, 'Test Short');

      expect(nameInput).toHaveValue('Test Name');
      expect(descriptionInput).toHaveValue('Test Description');
      expect(shortDescriptionInput).toHaveValue('Test Short');
    });

    it('should clear validation errors when user starts typing', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      // Trigger validation error
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });

      // Start typing to clear error
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'Valid Name');

      await waitFor(() => {
        expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/short description/i)).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      renderWithProvider(
        <CategoryForm
          title="Category Form"
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Category Form');
    });

    it('should associate error messages with form fields', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/name/i);
        const errorMessage = screen.getByText(/name is required/i);
        
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle partial initial category data', () => {
      const partialCategory = {
        id: '1',
        name: 'Partial Category',
        description: '',
        shortDescription: '',
      };

      renderWithProvider(
        <CategoryForm
          initialCategory={partialCategory}
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLInputElement;
      const shortDescriptionInput = screen.getByLabelText(/short description/i) as HTMLInputElement;

      expect(nameInput.value).toBe('Partial Category');
      expect(descriptionInput.value).toBe('');
      expect(shortDescriptionInput.value).toBe('');
    });

    it('should handle form submission with only required fields', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'Minimal Category');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalledWith({
          name: 'Minimal Category',
          description: '',
          shortDescription: '',
        });
      });
    });

    it('should handle rapid form submissions', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <CategoryForm
          onSuccess={mockOnSuccess}
          onCancel={mockOnCancel}
        />
      );

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'Test Category');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      
      // Rapid clicks
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalledTimes(1);
      });
    });
  });
});
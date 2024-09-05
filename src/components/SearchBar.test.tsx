import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  test('renders SearchBar correctly', () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const inputElement = screen.getByPlaceholderText(/Introduce un nombre de usuario/i);
    const buttonElement = screen.getByRole('button', { name: /Buscar/i });
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onSearch with the correct query when the form is submitted', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText(/Introduce un nombre de usuario/i);
    const buttonElement = screen.getByRole('button', { name: /Buscar/i });

    // Simula la entrada del usuario
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    fireEvent.click(buttonElement);

    // Verifica que se llama a la función con el valor correcto
    expect(onSearchMock).toHaveBeenCalledWith('testuser');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onSearch if input is empty', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const buttonElement = screen.getByRole('button', { name: /Buscar/i });
    fireEvent.click(buttonElement);

    // Verifica que no se llama a la función si el input está vacío
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  test('input updates correctly when typed into', () => {
    render(<SearchBar onSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/Introduce un nombre de usuario/i);
    
    // Simula la entrada del usuario
    fireEvent.change(inputElement, { target: { value: 'newuser' } });

    // Verifica que el valor del input se actualiza correctamente
    expect(inputElement).toHaveValue('newuser');
  });
});

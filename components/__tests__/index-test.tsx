import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Alert} from "react-native";
import Index from '../../app/index';
// Mock the Alert module
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
}));

describe('Index', () => {
    it("renders correctly", () => {
        render(<Index/>);
        expect(screen.getByPlaceholderText("Email")).toBeTruthy();
        expect(screen.getByPlaceholderText("Nombre de usuario")).toBeTruthy();
        expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
        expect(screen.getByPlaceholderText("Repetir Contraseña")).toBeTruthy();
        expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    })

    it ("validates email", () => {
        render(<Index/>);
        const emailInput = screen.getByPlaceholderText("Email");
        const button = screen.getByText("Iniciar Sesión");
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const passwordInput2 = screen.getByPlaceholderText('Repetir Contraseña');
        fireEvent.changeText (usernameInput, 'Gaia74')
        fireEvent.changeText (passwordInput, 'Testing123#')
        fireEvent.changeText (passwordInput2, 'Testing123#')
        fireEvent.changeText(emailInput, "user@")
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            "El email debe tener un formato válido"
        );
    });

    it('validates password', () => {
        render(<Index/>);
        const emailInput = screen.getByPlaceholderText("Email");
        const button = screen.getByText("Iniciar Sesión");
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const passwordInput2 = screen.getByPlaceholderText('Repetir Contraseña');
        fireEvent.changeText (usernameInput, 'Gaia74');
        fireEvent.changeText(emailInput, "usuario@dominio.com");
        fireEvent.changeText (passwordInput, 'testing');
        fireEvent.changeText (passwordInput2, 'testing');
        fireEvent.press(button);
        expect (Alert.alert).toHaveBeenCalledWith(
            'La contraseña debe tener al menos 8 caracteres'
        );
    })

    it('submits the form', () => {
        render(<Index/>);
        const emailInput = screen.getByPlaceholderText("Email");
        const button = screen.getByText("Iniciar Sesión");
        const usernameInput = screen.getByPlaceholderText('Nombre de usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const passwordInput2 = screen.getByPlaceholderText('Repetir Contraseña');
        fireEvent.changeText (usernameInput, 'Gaia74')
        fireEvent.changeText(emailInput, "usuario@dominio.com");
        fireEvent.changeText (passwordInput, 'Testing#123')
        fireEvent.changeText (passwordInput2, 'Testing#123')
        fireEvent.press(button);
        expect (Alert.alert).toHaveBeenCalledWith('VALIDACIÓN EXITOSA');
        expect(mockPush).toHaveBeenCalledWith({ pathname: '/register' });
    })
});
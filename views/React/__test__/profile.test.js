import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import ProfileSection from '../src/scenes/profilePage/ProfileSection';

const mockStore = configureStore([thunk]);

describe('ProfileSection', () => {
    let store;
    let initialState;

    beforeEach(() => {
        initialState = {
            user: {
                _id: "user-id",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            },
            token: "token",
        };

        store = mockStore(initialState);
    });

    test("renders the user's information correctly", () => {
        render(
            <Provider store={store}>
                <ProfileSection />
            </Provider>
        );

        const firstName = screen.getByTestId('user-first-name');
        const lastName = screen.getByTestId('user-last-name');
        const email = screen.getByTestId('user-email');

        expect(firstName.textContent).toBe("John");
        expect(lastName.textContent).toBe("Doe");
        expect(email.textContent).toBe("john.doe@example.com");
    });

    test('displays form fields when edit mode is true', () => {
        render(
            <Provider store={store}>
                <ProfileSection />
            </Provider>
        );

        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        const firstNameInput = screen.getByTestId('user-first-name-input');
        const lastNameInput = screen.getByTestId('user-last-name-input');
        const emailInput = screen.getByTestId('user-email-input');

        expect(firstNameInput.value).toBe("John");
        expect(lastNameInput.value).toBe("Doe");
        expect(emailInput.value).toBe("john.doe@example.com");
    });

    test('submits the form and updates the user information', async () => {
        render(
            <Provider store={store}>
                <ProfileSection />
            </Provider>
        );

        const editButton = screen.getByTestId('edit-button');
        fireEvent.click(editButton);

        await waitFor(() => {
            const firstNameInput = screen.getByTestId('user-first-name-input');
            const lastNameInput = screen.getByTestId('user-last-name-input');
            const emailInput = screen.getByTestId('user-email-input');

            fireEvent.change(firstNameInput, { target: { value: 'Yohn' } });
            fireEvent.change(lastNameInput, { target: { value: 'Do' } });
            fireEvent.change(emailInput, { target: { value: 'yohn.do@example.com' } });
        });

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);
    });
});

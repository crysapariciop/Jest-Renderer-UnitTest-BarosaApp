
import React from 'react';
import { RecoilRoot } from 'recoil';
import { act } from 'react-test-renderer';
import renderer from 'react-test-renderer';
import { userFromStorageSelector } from '../src/modules/auth-module/auth-store';
import App from '../App';

describe('Authentication Navigation Flow', () => {
  it('navigates to MainScreenStack after successful login', async () => {
    // Simula datos de usuario autenticado
    const mockUserData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userType:'user',
      token: 'test-token',
      userId: '123',
      images: { cover: 'cover.jpg', profile: 'profile.jpg' },
      isEmailVerified: true,
    };

    // Crea una instancia del componente con RecoilRoot
    let component;
    await act(async () => {
      component = renderer.create(
        <RecoilRoot initializeState={(snap) => snap.set(userFromStorageSelector, {
          isLoaded: true,
          error: false,
          data: mockUserData,
        })}>
          <App />
        </RecoilRoot>
      );
    });
    
    const tree = component.toJSON();


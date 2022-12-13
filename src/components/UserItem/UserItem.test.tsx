import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {UserItem} from '.';
import {mockUser} from '../../__mocks__/user';

describe('UserItem Component', () => {
  it('renders correctly', () => {
    render(<UserItem user={mockUser} />);
    const nameElem = screen.getByText('Jon Skeet');
    expect(nameElem).toBeVisible();
    const reputationElem = screen.getByText('Reputation: 1373465');
    expect(reputationElem).toBeVisible();
  });

  it('reveals options when clicked', async () => {
    render(<UserItem user={mockUser} />);
    const userItem = screen.getByTestId('user-item');
    fireEvent.press(userItem);
    const follow = screen.getByText('Follow', {exact: false});
    const block = screen.getByText('Block', {exact: false});
    expect(follow).toBeVisible();
    expect(block).toBeVisible();
  });

  it('correctly follows and unfollows a user', () => {
    render(<UserItem user={mockUser} />);
    const userItem = screen.getByTestId('user-item');
    fireEvent.press(userItem);
    const follow = screen.getByText('Follow', {exact: false});
    fireEvent.press(follow);
    const followingIcon = screen.getByTestId('star-follow');
    expect(followingIcon).toBeVisible();
    fireEvent.press(userItem);
    const unfollow = screen.getByText('Unfollow', {exact: false});
    fireEvent.press(unfollow);
    expect(screen.queryByTestId('star-follow')).toBeNull();
  });

  it('correctly blocks a user', () => {
    render(<UserItem user={mockUser} />);
    const userItem = screen.getByTestId('user-item');
    fireEvent.press(userItem);
    const block = screen.getByText('Block', {exact: false});
    fireEvent.press(block);
    expect(userItem).toBeDisabled();
  });
});

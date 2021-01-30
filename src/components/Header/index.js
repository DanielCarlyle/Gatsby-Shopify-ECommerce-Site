import React from 'react';
import { HeaderWrapper } from './styles';
import { Cart } from '../Cart';


export function Header() {
  return (
    <HeaderWrapper>
       <Cart />
    </HeaderWrapper>
  );
}

import React from 'react';
import { HeaderWrapper } from './styles';
import { Cart } from '../Cart';
import { Search } from '../Search';


export function Header() {
  return (
    <HeaderWrapper>
      <Search />
       <Cart />
    </HeaderWrapper>
  );
}

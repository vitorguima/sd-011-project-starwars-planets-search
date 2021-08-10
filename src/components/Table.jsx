import React from 'react';
import RenderHeader from './RenderHeader';
import RenderBody from './RenderBody';

export default function Table() {
  return (
    <table>
      <RenderHeader />
      <RenderBody />
    </table>
  );
}

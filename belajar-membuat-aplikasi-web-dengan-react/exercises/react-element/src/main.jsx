import React from 'react';
import { createRoot } from 'react-dom/client';

const heading = React.createElement('h1', null, 'Biodata Perusahaan');
const listItem = [
  'Nama: Dicoding Indonesia',
  'Bidang: Education',
  'Tagline: Decode Ideas, Discover Potential.',
];

const unorderedList = React.createElement(
  'ul',
  null,
  listItem.map((item) => React.createElement('li', null, item))
)

const container = React.createElement('div', null, [heading, unorderedList]);

const root = createRoot(document.getElementById('root'));
root.render(container);
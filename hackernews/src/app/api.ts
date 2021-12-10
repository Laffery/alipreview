import { baseUrl } from 'config';

export const item = (id: number) =>
  `${baseUrl}/v0/item/${id}.json`;

export const top = () => `${baseUrl}/v0/topstories.json`;

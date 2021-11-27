import { letters } from './letters';
import { numbers } from './numbers';
import { symbols } from './symbols';
import { escaped } from './escapedKeys';

const allCharacters = [...letters, ...numbers, ...symbols];

export default allCharacters;
export { escaped };

import { Cow } from './cow.entity';

describe('CowEntity', () => {
  it('should be defined', () => {
    expect(new Cow()).toBeDefined();
  });
});

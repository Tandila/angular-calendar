import { TransformNumbersToStringPipe } from './transform-numbers-to-string.pipe';

describe('TransformNumbersToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformNumbersToStringPipe();
    expect(pipe).toBeTruthy();
  });
});

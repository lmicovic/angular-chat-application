import { MessageDatePipe } from './message-date.pipe';

describe('MessageDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MessageDatePipe();
    expect(pipe).toBeTruthy();
  });
});

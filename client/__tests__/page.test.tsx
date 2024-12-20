import { render, screen } from '@testing-library/react';
import HomePage from '../src/app/page';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalFetch: any;

describe('Home', () => {
  beforeAll(() => {
    globalFetch = global.fetch;
    // @ts-expect-error next line
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Hello World!' }),
      })
    );
  });

  afterAll(() => {
    global.fetch = globalFetch;
  });
  
  it('renders a heading', () => {
    render(<HomePage />);
    const mainImage = screen.getByTestId('main-image');
    expect(mainImage).toBeDefined();
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import {
  schemaFactory,
  translationsFactory,
  uiSchemaFactory,
  widgetsFactory,
} from ':/tests/mocks/factories';
import VernaForm from ':/components/VernaForm';
import VernaProvider, { type VernaProviderProps } from '.';

describe('custom render components', () => {
  const VernaSuspenseWrapper = (props: Partial<VernaProviderProps>) => (
    <Suspense fallback={<span data-testid="suspense-fallback" />}>
      <VernaProvider
        isEditor
        defaultSchema={schemaFactory()}
        defaultUiSchema={uiSchemaFactory()}
        defaultWidgets={widgetsFactory()}
        locale="en-US"
        translations={translationsFactory()}
        {...props}
      >
        <VernaForm />
      </VernaProvider>
    </Suspense>
  );

  it('should overload render section component', async () => {
    render(<VernaSuspenseWrapper Section={() => <h1>SECTION</h1>} />);

    await waitFor(() => {
      screen.getByText('SECTION');
    });
  });

  it('should overload render dropzone component', async () => {
    render(<VernaSuspenseWrapper DropZone={() => <h1>DROPZONE</h1>} />);

    await waitFor(() => {
      expect(screen.queryAllByRole('heading', { level: 1, name: 'DROPZONE' })).toHaveLength(2);
    });
  });

  it('should overload render fieldTemplate component', async () => {
    render(<VernaSuspenseWrapper FieldTemplate={() => <h1>FIELD TEMPLATE</h1>} />);

    await waitFor(() => {
      screen.getByRole('heading', { level: 1, name: 'FIELD TEMPLATE' });
    });
  });

  it('should overload render submit button component', async () => {
    render(<VernaSuspenseWrapper SubmitButton={<h1>SUBMIT BUTTON</h1>} isEditor={false} />);

    await waitFor(() => {
      screen.getByRole('heading', { name: 'SUBMIT BUTTON' });
    });
  });
});

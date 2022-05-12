import { fireEvent, render, screen } from '@testing-library/react';
import VernaProvider from '../providers/VernaProvider';
import {
  getCustomSchemaDefault,
  getUiSchemaDefault,
  getWidgetConf,
  getWidgets,
} from './mocks/FormProps';
import VernaForm from '../components/VernaForm';

describe('widget properties edition', () => {
  it('should render a custom widget', async () => {
    render(
      <VernaProvider
        isEditor
        defaultSchema={getCustomSchemaDefault()}
        defaultUiSchema={getUiSchemaDefault()}
        defaultWidgets={getWidgets()}
        locale="en"
      >
        <VernaForm />
      </VernaProvider>,
    );

    screen.getByRole('group', { name: 'A registration form' });

    const $select = document.getElementById('root_testSection_select') as HTMLSelectElement;

    expect($select).toBeInstanceOf(HTMLSelectElement);
    expect($select.type).toBe('select-one');
  });

  it('should modify options of a custom widget and update it', async () => {
    render(
      <VernaProvider
        isEditor
        configSchema={getWidgetConf()}
        defaultSchema={getCustomSchemaDefault()}
        defaultUiSchema={getUiSchemaDefault()}
        defaultWidgets={getWidgets()}
        locale="en"
      >
        <VernaForm />
      </VernaProvider>,
    );

    // Open parameters
    screen.getByRole('button', { name: 'Parameters' }).click();
    screen.getByRole('group', { name: 'Options' });

    // Check required checkbox
    screen.getByRole('checkbox', { name: 'required' }).click();

    // Add two inputs in the list of choices
    screen.getByRole('button', { name: 'Add' }).click();
    screen.getByRole('button', { name: 'Add' }).click();

    // Set the value of the new field
    const $newInputs = screen.getAllByRole('textbox', {});
    fireEvent.change($newInputs[0], { target: { value: 'newChoice1' } });
    fireEvent.change($newInputs[1], { target: { value: 'newChoice2' } });

    // Save parameters
    screen.getAllByRole('button', { name: 'save' })[0].click();

    // Open parameters again
    screen.getByRole('button', { name: 'Parameters' }).click();

    // Check that the previous options are updated correctly
    // Nb: those options are not cached, it's checking defaultSchema & defaultUiSchema
    //     on each opening
    const $inputs = screen.getAllByRole('textbox', {});
    expect($inputs[0]).toHaveValue('newChoice1');
    expect($inputs[1]).toHaveValue('newChoice2');
  });
});

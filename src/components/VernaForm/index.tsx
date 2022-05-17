import { IntlProvider } from 'react-intl';
import { useVerna } from '../../providers/VernaProvider';
import Form from '@rjsf/core';
import EditorFieldTemplate from '../EditorFieldTemplate';
import { RJSF_ID_SEPARATOR } from '../../settings';

interface VernaFormProperties {
  onSubmit: (formData: unknown) => void;
}

function VernaForm({ onSubmit }: VernaFormProperties) {
  const {
    schema,
    uiSchema,
    widgets,
    selectedFormData,
    handleSubmit,
    isEditor,
    translations,
    language,
  } = useVerna();

  return (
    <IntlProvider locale={language} messages={translations?.[language]}>
      <Form
        FieldTemplate={EditorFieldTemplate}
        className="form"
        disabled={isEditor}
        formData={selectedFormData}
        idSeparator={RJSF_ID_SEPARATOR}
        liveValidate={!isEditor}
        onSubmit={handleSubmit(onSubmit)}
        schema={schema}
        showErrorList={false}
        tagName={isEditor ? 'div' : undefined}
        uiSchema={uiSchema}
        widgets={widgets}
      />
    </IntlProvider>
  );
}

VernaForm.defaultProps = {
  onSubmit: () => undefined,
};

export default VernaForm;

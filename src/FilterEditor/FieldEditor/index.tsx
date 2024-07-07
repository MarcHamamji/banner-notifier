import React from 'react';
import {Field} from '../fields';
import Select from './FieldEditorSelect';
import BannerAPI from '../../BannerAPI';

interface FilterEditorProps {
  field: Field;
  bannerAPI: BannerAPI;
  termCode: string;
}

function FieldEditor({
  field,
  bannerAPI,
  termCode,
}: FilterEditorProps): React.JSX.Element {
  switch (field.type) {
    case 'select':
      return (
        <Select
          field={field}
          bannerAPI={bannerAPI}
          termCode={termCode}
          anchorPosition="bottom"
        />
      );
  }
}

export default FieldEditor;

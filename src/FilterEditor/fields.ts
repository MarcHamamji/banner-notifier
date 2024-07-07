import BannerAPI from '../BannerAPI';
import {SearchableField} from '../BannerAPI/types/fields';
import {FieldSelect} from './FieldEditor/FieldEditorSelect';

export type FieldBase = {
  id: string;
  name: string;
  type: string;
};

export type Field = FieldSelect;

const searchFields: Field[] = [
  {
    name: 'Subjects',
    id: 'subjects',
    type: 'select',
    multiple: true,
    entries: async (api: BannerAPI, termCode: string) => {
      const subjects = await api.searchFieldOptions(
        termCode,
        SearchableField.subjects,
        {
          pagination: {
            max: 50,
            offset: 0,
          },
        },
      );
      return subjects.map(subject => ({
        type: 'entry',
        value: subject.code,
        label: subject.description,
        checked: false,
      }));
    },
  },
];

export default searchFields;

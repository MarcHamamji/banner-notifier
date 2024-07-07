import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Checkbox,
  Divider,
  Menu,
  TextInput,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import BannerAPI from '../../BannerAPI';
import {FieldBase} from '../fields';

type SelectEntry =
  | {
      type: 'entry';
      value: string;
      label: string;
      checked: boolean;
    }
  | {
      type: 'divider';
    }
  | {
      type: 'action';
      label: string;
      action: (entries: SelectEntry[]) => SelectEntry[];
    };

export interface FieldSelect extends FieldBase {
  type: 'select';
  entries:
    | SelectEntry[]
    | ((api: BannerAPI, termCode: string) => SelectEntry[])
    | ((api: BannerAPI, termCode: string) => Promise<SelectEntry[]>);
  multiple: boolean;
  useValueInText: boolean;
}

function SelectLeadingIcon(
  color: string,
  entry: SelectEntry & {type: 'entry'},
): React.JSX.Element {
  return (
    <Checkbox color={color} status={entry.checked ? 'checked' : 'unchecked'} />
  );
}

interface SelectTextInputProps {
  label: string;
  placeholder?: string;
  showMenu: () => void;
  hideMenu: () => void;
  text: string;
}

function SelectTextInput({
  label,
  placeholder,
  showMenu,
  hideMenu,
  text,
}: SelectTextInputProps): React.JSX.Element {
  return (
    <View onTouchEnd={showMenu}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={text}
        editable={false}
        onBlur={hideMenu}
        onFocus={showMenu}
        onPress={showMenu}
        right={<TextInput.Icon icon="menu-down" />}
      />
    </View>
  );
}

interface SelectProps {
  field: FieldSelect;
  bannerAPI: BannerAPI;
  termCode: string;
  padding?: number;
  anchorPosition?: 'top' | 'bottom';
  setValue?: (value: string) => void;
}

function Select({
  field,
  bannerAPI,
  termCode,
  padding,
  anchorPosition,
  setValue,
}: SelectProps): React.JSX.Element {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const [entries, setEntries] = useState<SelectEntry[]>([]);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = async () => {
    setMenuVisible(true);
    if (loading) {
      if (typeof field.entries === 'function') {
        setEntries(await field.entries(bannerAPI, termCode));
      } else {
        setEntries(field.entries);
      }
    }
    setLoading(false);
  };

  const closeMenu = () => setMenuVisible(false);

  const toggleEntry = useCallback(
    (entryIndex: number) => {
      if (field.multiple) {
        const newEntries = entries.map((entry, index) => {
          if (entry.type !== 'entry') {
            return entry;
          }
          return index === entryIndex
            ? {...entry, checked: !entry.checked}
            : entry;
        });
        setEntries(newEntries);
        setText(
          newEntries.reduce((acc, entry) => {
            if (entry.type === 'entry' && entry.checked) {
              return (
                acc +
                (acc ? ', ' : '') +
                (field.useValueInText ? entry.value : entry.label)
              );
            }
            return acc;
          }, ''),
        );
      } else {
        const newEntries = entries.map((entry, index) => {
          if (entry.type !== 'entry') {
            return entry;
          }
          return {
            ...entry,
            checked: index === entryIndex,
          };
        });
        setEntries(newEntries);
        setText(
          newEntries.reduce((acc, entry) => {
            if (entry.type === 'entry' && entry.checked) {
              return field.useValueInText ? entry.value : entry.label;
            }
            return acc;
          }, ''),
        );
        closeMenu();
      }
      const entry = entries[entryIndex];
      if (entry.type === 'entry' && setValue) {
        setValue(entry.value);
      }
    },
    [entries, field, setValue],
  );

  const runAction = useCallback(
    (actionIndex: number) => {
      const action = entries[actionIndex];
      if (action.type !== 'action') {
        return;
      }
      setEntries(oldEntries => action.action(oldEntries));
    },
    [entries],
  );

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      style={{
        width: '100%',
        paddingHorizontal: padding || 16,
        left: 0,
      }}
      anchor={
        <SelectTextInput
          text={text}
          label={field.name}
          showMenu={openMenu}
          hideMenu={closeMenu}
        />
      }
      anchorPosition={anchorPosition}>
      {loading ? (
        <ActivityIndicator
          style={{
            marginHorizontal: 'auto',
            marginVertical: 8,
          }}
          animating={true}
          size={'small'}
        />
      ) : (
        <ScrollView
          style={{
            width: '100%',
          }}>
          {entries.map((entry, index) => {
            switch (entry.type) {
              case 'entry':
                return (
                  <Menu.Item
                    key={index}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                    }}
                    onPress={() => toggleEntry(index)}
                    title={entry.label}
                    leadingIcon={
                      field.multiple
                        ? ({color}) => SelectLeadingIcon(color, entry)
                        : undefined
                    }
                  />
                );
              case 'divider':
                return <Divider key={index} />;
              case 'action':
                return (
                  <Menu.Item
                    key={index}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                    }}
                    onPress={() => runAction(index)}
                    title={entry.label}
                  />
                );
            }
          })}
        </ScrollView>
      )}
    </Menu>
  );
}

export default Select;

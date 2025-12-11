import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

interface SelectDropdownProps extends React.ComponentProps<typeof SelectList> {
  //   data: { key: string; value: string }[];
  //   onSelect: (value: string) => void;
}

export const SelectDropdown = ({ onSelect, data, ...props }: SelectDropdownProps) => {
  return (
    <SelectList
      data={data}
      save="value"
      searchicon={() => <AntDesign name="search" size={24} color="black" />}
      closeicon={() => <AntDesign name="close" size={24} color="black" />}
      boxStyles={{
        zIndex: 100,
        borderWidth: 2,
        borderRadius: 8,
        marginHorizontal: 12,
        backgroundColor: 'white',
        borderColor: 'transparent',
      }}
      inputStyles={{
        color: 'slategrey',
      }}
      dropdownStyles={{
        backgroundColor: 'white',
        marginHorizontal: 12,
        borderRadius: 8,
        borderColor: 'transparent',
        zIndex: 100,
      }}
      dropdownTextStyles={{
        color: 'slategrey',
      }}
      {...props}
    />
  );
};

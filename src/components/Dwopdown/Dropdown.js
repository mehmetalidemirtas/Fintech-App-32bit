import React, {useState, useContext} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../context/ThemeContext';

const Dropdown = ({data, title, placeholder, selected}) => {
  const {theme} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <SelectList
      setSelected={selected}
      data={data}
      title={title}
      searchPlaceholder={t('search')}
      notFoundText={t('notFound')}
      placeholder={placeholder}
      save="value"
      dropdownTextStyles={{color: theme.textColor}}
      dropdownItemStyles={{color: theme.textColor}}
      boxStyles={theme.textColor}
      inputStyles={{color: theme.textColor}}
    />
  );
};
export default Dropdown;

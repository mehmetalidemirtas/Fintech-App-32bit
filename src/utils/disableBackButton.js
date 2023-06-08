import {BackHandler} from 'react-native';
import React, {useEffect} from 'react';

export const disableBackButton = () => {
  const handleBackPress = () => {
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, []);
};

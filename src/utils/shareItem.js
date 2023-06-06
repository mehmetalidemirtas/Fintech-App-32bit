import {Share} from 'react-native';
import {formatDate} from './dateFormatter';

export const shareItem = item => {
  Share.share({
    message:
      `${item.currencyNameToBeSold} / ${item.currencyToBeReceived}\n` +
      `Satılan hesap: ${item.bankAccountToBeSold}\n` +
      `Aktarılan hesap: ${item.bankAccountToBeReceived}\n` +
      `Kur oranı: ${item.exchangeRate}\n` +
      `Toplam yeni bakiye: ${item.newTotalAmount} ${item.currencyToBeReceived}\n` +
      `${formatDate(new Date(parseInt(item.time)))}\n` +
      `+ ${item.outputValue} ${item.currencyToBeReceived}\n`,
  });
};

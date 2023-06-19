import {Share} from 'react-native';
import {formatDate} from './dateFormatter';

export const shareItem = item => {
  Share.share({
    message:
      `${item.currencyNameToBeSold} / ${item.currencyToBeReceived}\n` +
      `Sold account:: ${item.bankAccountToBeSold}\n` +
      `Transferred account: ${item.bankAccountToBeReceived}\n` +
      `Exchange rate: ${item.exchangeRate}\n` +
      `New total amount: ${item.newTotalAmount} ${item.currencyToBeReceived}\n` +
      `${formatDate(new Date(parseInt(item.time)))}\n` +
      `+ ${item.outputValue} ${item.currencyToBeReceived}\n`,
  });
};

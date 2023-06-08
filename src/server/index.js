import {port} from './connectionString';
const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// USD, EUR, GBP, IDR, JPY değerlerini içeren bir dizi oluşturuyoruz
const currencies = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CHF',
  'CAD',
  'AUD',
  'CNY',
  'KRW',
  'RUB',
  'SEK',
  'NOK',
  'DKK',
  'UAH',
  'IDR',
  'ALI',
  'TEST',
];

// Değerleri rastgele olarak üretecek bir fonksiyon yazıyoruz
function generateRandomValue() {
  return (Math.random() * (20 - 10) + 10).toFixed(2);
}
let previousSellValues = {
  USD: null,
  EUR: null,
  GBP: null,
  IDR: null,
  JPY: null,
  CHF: null,
  CHF: null,
  CAD: null,
  AUD: null,
  CNY: null,
  KRW: null,
  RUB: null,
  SEK: null,
  NOK: null,
  DKK: null,
  UAH: null,
  TEST: null,
};

io.on('connection', socket => {
  console.log('a user connected');
  const data = currencies //İlk açılışta yüklenecek veriler
    .map(currency => {
      const buyValue = generateRandomValue();
      const previousSellValue = 0;
      const sellValue = (parseFloat(buyValue) + Math.random() * 2).toFixed(2);
      previousSellValues[currency] = sellValue;
      const changeRate = 0;
      const backgroundColor = '#3E54AC';
      const time = Date.now();
      return `${currency}|${buyValue}|${sellValue}|${time}|${backgroundColor}|${changeRate}`;
    })
    .join(',');

  console.log('Sending data:', data);
  socket.emit('currency-update', data);

  // Belirli aralıklarla rastgele değerler üreterek frontend'e gönderiyoruz
  const interval = setInterval(() => {
    const data = currencies
      .map(currency => {
        const buyValue = generateRandomValue();
        const previousSellValue = previousSellValues[currency];
        const sellValue = (parseFloat(buyValue) + Math.random() * 2).toFixed(2);
        previousSellValues[currency] = sellValue;
        const changeRate = calculateChangeRate(previousSellValue, sellValue);
        const backgroundColor =
          previousSellValue === null
            ? '#3E54AC'
            : sellValue > previousSellValue
            ? '#7AA874'
            : sellValue < previousSellValue
            ? '#FF4F5A'
            : '#7AA874';
        const time = Date.now();
        return `${currency}|${buyValue}|${sellValue}|${time}|${backgroundColor}|${changeRate}`;
      })
      .join(',');

    console.log('Sending data:', data);
    socket.emit('currency-update', data);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clearInterval(interval);
  });
});
function calculateChangeRate(previousValue, currentValue) {
  if (previousValue === null) {
    return 0;
  }
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return parseFloat(change.toFixed(2));
}
server.listen(port, () => {
  console.log('listening on :' + {port});
});

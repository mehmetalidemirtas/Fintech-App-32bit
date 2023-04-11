const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// USD, EUR, GBP, IDR, JPY değerlerini içeren bir dizi oluşturuyoruz
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF','CAD','AUD','CNY','KRW','RUB','SEK','NOK','DKK','UAH','IDR','ALI','TEST'];

// Değerleri rastgele olarak üretecek bir fonksiyon yazıyoruz
function generateRandomValue() {
  return (Math.random() * (20 - 10) + 10).toFixed(5);
}
let previousSellValues = {
  USD: null, EUR: null, GBP: null, IDR: null, JPY: null, CHF: null, CHF: null, CAD: null, AUD: null, CNY: null, KRW: null, RUB: null, SEK: null, NOK: null, DKK: null, UAH: null, TEST:null,
};

io.on('connection', (socket) => {
  console.log('a user connected');
  const data = currencies.map(currency => {
    const buyValue = generateRandomValue();
    const previousSellValue = previousSellValues[currency];
    const sellValue = (parseFloat(buyValue) + Math.random() * 2).toFixed(5);
    previousSellValues[currency] = sellValue;
const backgroundColor =
  previousSellValue === null
    ? '#3E54AC'
    : sellValue > previousSellValue
    ? '#7AA874'
    : sellValue < previousSellValue
    ? '#FF4F5A'
    : '#7AA874';
    const time = Date.now();
    return `${currency}|${buyValue}|${sellValue}|${time}|${backgroundColor}`;
  }).join(',');
  
  console.log('Sending data:', data);
  socket.emit('currency-update', data);

  // Belirli aralıklarla rastgele değerler üreterek frontend'e gönderiyoruz
  const interval = setInterval(() => {    
    const data = currencies.map(currency => {
    const buyValue = generateRandomValue();
    const previousSellValue = previousSellValues[currency];
    const sellValue = (parseFloat(buyValue) + Math.random() * 2).toFixed(5);
    previousSellValues[currency] = sellValue;
const backgroundColor =
  previousSellValue === null
    ? '#3E54AC'
    : sellValue > previousSellValue
    ? '#7AA874'
    : sellValue < previousSellValue
    ? '#FF4F5A'
    : '#7AA874';
    const time = Date.now();
    return `${currency}|${buyValue}|${sellValue}|${time}|${backgroundColor}`;
  }).join(',');
  
  console.log('Sending data:', data);
  socket.emit('currency-update', data);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('listening on :3000');
});
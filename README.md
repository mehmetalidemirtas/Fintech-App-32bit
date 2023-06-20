<h1 align="center">
  FX32
</h1>

FX32 is an innovative foreign exchange trading application developed using React Native. With this application, users can easily track currency exchange rates, perform real-time foreign exchange transactions, and manage their bank accounts. FX32 aims to provide a secure and efficient experience in the foreign exchange market, standing out with its user-friendly interface and fast performance. Create a user account, log in, create your bank accounts and choose your favorite currencies to list. Conduct your buy and sell transactions effortlessly among the available currency pairs. Choose FX32 for a fast, reliable, and user-centric foreign exchange trading experience!

## Introduce

- [Features and Used Technologies](#features-and-used-technologies)
- [Usage](#usage)
- [Websocket](#websocket)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [License](#license)

## Features and Used Technologies

**1. Websocket:** Track real-time currency exchange rates using a connection established through Websocket.

**2. Async Storage:** User credentials, transaction history, and other data are stored in local storage.

**3. NFC:** During account registration, you can quickly register by scanning your ID card using NFC.

**4. Context API:** Used for managing application state and data flow.

**5. i18next:** You can use the application in different languages such as Turkish and English.

## Usage

Make sure you have the necessary tools and environment set up for React Native development.

### Install

```bash
Clone this repository with `git clone mehmetalidemirtas/Fintech-App-32bit`
Navigate to the project directory with `cd Fintech-App-32bit`
```

### Setup

```bash
Install packages with `npm install`
```

### Start

```bash
Run `npx react-native start` to start Metro bundler
Connect your device or start an emulator.
Run `npx react-native run-android` to start the application
```

## Websocket

This application utilizes a WebSocket connection to fetch real-time data. The real-time data is sourced from the [FX32](https://fx32.vercel.app/). If you encounter any issues with the connection, you can use the server provided within the project.

To use the server included in the project, replace the connection address and port number in `src/server/connectionString/` with your own localhost or IPv4 address and port number. Then, run the command `node src/server/index.js`.

To learn more about WebSocket connection, you can refer to the following repository: [Currency Mock Service](https://github.com/mehmetalidemirtas/socket.io-currency-mock-service).

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## Screenshots

|      |      |       |      |
| ------------- | ------------- | ------------- | ------------- |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/e7452ea9-0a36-4726-8669-b7443e9ad9c0) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/daa34d9a-29eb-4de6-829c-8f56fc56dc5a) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/8d0707fe-e0ac-4fed-829d-0fa4369ac106) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/467eb78c-3083-4039-8008-5a22280faeb6) | 
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/ac597418-2622-4763-ba65-30006357f79d) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/466414fe-0617-43c5-9f44-a0e0dc72fcaf) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/6d623b7e-b8b7-47db-97f0-1eef20397107) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/3864c40c-6292-47ca-aee7-6b3351a61feb) | 
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/aeae2a9a-6fb4-4ed3-aeeb-4b4e5e32dc02) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/a4edc57d-f60a-476f-956d-3bbeabb75f1f) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/01b667ff-50fc-433c-80b5-0714280cfa6b) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/10ab4b11-6500-457b-b577-720a572ca644) | 
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/89a04cd1-20a6-4383-9dc2-99e4364c532e) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/2a0147af-b79e-40fc-97ae-1fd2764ea8ba) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/78bd965f-6b93-40d1-9eb9-4513dec1743f) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/91407df1-6a3b-4248-9476-386c7a346feb) | 


## License

This project is licensed under the [MIT License](LICENSE)

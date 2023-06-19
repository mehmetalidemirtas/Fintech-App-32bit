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

|                                                                                                                  |                                                                                                                  |                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/2037f92f-ee14-4155-ab42-de08ba6da8c9) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/0327ea23-8663-47c5-95be-3e7983f91e40) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/65c5d3fb-00c1-4fa0-b06b-86ee378bf353) |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/f115b730-6d38-457a-8048-ef1c2c890a78) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/a5467a12-5be1-4b52-b6c9-ae8126bc6981) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/85eb6335-2d49-4544-972c-3405cf0415ce) |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/5a55f9ba-88b1-4315-a17d-21ee8f9fe515) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/c4df7cd5-c53a-43a3-9a78-f8a68312a2d5) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/e837d406-ce6d-4004-a927-65fce5a2369f) |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/471597b0-c7cc-41ce-bb37-174ef744209a) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/a30a6de5-1455-4950-a234-56e447e383a3) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/8c0eb4d3-2f68-41e5-8497-8163ca2bbd75) |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/659e1094-2043-4e5e-8844-b767d7769aaa) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/fbc37ef7-f631-4463-9028-05da6648d769) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/0b2e74e8-64d4-49e5-ab86-1da61fd898e2) |
| ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/398b54b0-57f0-4764-8b3b-b88933a0909a) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/ce488d9a-e023-4913-8b85-3210611fe53f) | ![](https://github.com/mehmetalidemirtas/Fintech-App-32bit/assets/82759834/c022d341-268a-480f-af1c-0dd2ddf94e90) |

## License

This project is licensed under the [MIT License](LICENSE)

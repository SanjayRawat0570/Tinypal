// Centralized config for API base URL. Change when testing on device/emulator.
const DEV_HOST = 'http://10.0.2.2:4000'; // Android emulator default
const LOCAL_HOST = 'http://localhost:4000';

// If you run on a physical device on the same network, replace with your machine IP.
export const API_BASE = LOCAL_HOST;

export default {
  API_BASE
};

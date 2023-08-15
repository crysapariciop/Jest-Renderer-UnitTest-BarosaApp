export const eventListeners = [
  { event: 'connect', handler: () => console.log('Socket connected') },
  { event: 'connect_error', handler: (err: any) => console.log('Error', err) },
  { event: 'disconnect', handler: () => console.log('Disconnected Socket!') },
];

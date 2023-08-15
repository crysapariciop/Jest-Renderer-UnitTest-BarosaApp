export const brands = [
  { title: 'Brand', text: 'Rolex' },
  { title: 'Model Number', text: '1166113LB' },
  { title: 'Serial Number', text: '23475382' },
  { title: 'Minting Date', text: '21 Dec 2022' },
  { title: 'Certified By', text: 'WatchSquare' },
];

export const TrackingInfo = [
  { title: 'Order Pickup', status: 'progress' },
  { title: 'In Transit', status: 'pending' },
  { title: 'Out for Delivery', status: 'pending' },
  { title: 'Delivered', status: 'pending' },
];

export const Signers = [
  { title: 'John Doe', mail: 'johndoe@fghmail.com', signed: true },
  { title: 'Josh Braun', mail: 'josh@watchsquare.com', signed: false },
];

export const payoutDetails = [
  { title: 'Payment Id', text: '3697627560832447514' },
  { title: 'Final Sale Price:', text: '$22,100.00' },
  { title: 'Dealer Consignment Fee', text: '- $1,326.00' },
  { title: 'Barosa Transaction Fee', text: '$331.50' },
  { title: 'Authentication NFT Fee', text: '$99.95' },
  { title: 'Net Payout', text: '$20342.55' },
];

export const PaymentReqDetails: any = [
  { title: 'Payment Id', text: '3697627560832447514' },
  { title: 'Sub-total', text: '$22,100.00' },
  { title: 'Authentication NFT Fee', text: '- $1,326.00' },
  { title: 'VAT (8%)', text: '$331.50' },
];

export const DaysData = [
  { title: '4 days remaining', days: 4, percent: 80 },
  { title: '3 days remaining', days: 3, percent: 60 },
  { title: '2 days remaining', days: 2, percent: 40 },
  { title: '1 days remaining', days: 1, percent: 20 },
];

export const MESSAGE_STATUS_MAPPING: Record<string, any> = {
  declined: 'Declined',
  sent: 'Not Signed',
  completed: 'Signed',
};

export const ProposalData = [
  '4.0% : up to $10,000',
  '3.5% : $10,000 - $99,999',
  '3.0% : $100,000 - $249,999',
  '2.0% : $250,000 - $500,000',
  '1.0% : $1,000,000 or more',
  'Credit card fee = 3.5%',
  'Wire Transfer fee = $40',
];

import { DistantTables } from 'src/engine/metadata-modules/remote-server/remote-table/distant-table/types/distant-table';

/* Commented out tables / columns are either:
 - not supported by the Stripe API
 - not supported by the wrapper
 */

export const STRIPE_DISTANT_TABLES: DistantTables = {
  accounts: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'business_type', dataType: 'text', udtName: 'text' },
    { columnName: 'country', dataType: 'text', udtName: 'text' },
    { columnName: 'email', dataType: 'text', udtName: 'text' },
    { columnName: 'type', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  balance_transactions: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    { columnName: 'fee', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'net', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'type', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  // charges: [
  // { columnName: 'id', dataType: 'text', udtName: 'text' },
  // { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
  // { columnName: 'currency', dataType: 'text', udtName: 'text' },
  // { columnName: 'customer', dataType: 'text', udtName: 'text' },
  // { columnName: 'description', dataType: 'text', udtName: 'text' },
  // { columnName: 'invoice', dataType: 'text', udtName: 'text' },
  // { columnName: 'payment_intent', dataType: 'text', udtName: 'text' },
  // { columnName: 'status', dataType: 'text', udtName: 'text' },
  // { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  // ],
  customers: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'email', dataType: 'text', udtName: 'text' },
    { columnName: 'name', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  disputes: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'charge', dataType: 'text', udtName: 'text' },
    { columnName: 'payment_intent', dataType: 'text', udtName: 'text' },
    { columnName: 'reason', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  // events: [
  //   { columnName: 'id', dataType: 'text', udtName: 'text' },
  //   { columnName: 'type', dataType: 'text', udtName: 'text' },
  //   { columnName: 'api_version', dataType: 'text', udtName: 'text' },
  //   { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  // ],
  files: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'filename', dataType: 'text', udtName: 'text' },
    { columnName: 'purpose', dataType: 'text', udtName: 'text' },
    { columnName: 'title', dataType: 'text', udtName: 'text' },
    { columnName: 'size', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'type', dataType: 'text', udtName: 'text' },
    { columnName: 'url', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
    { columnName: 'expires_at', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  file_links: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'file', dataType: 'text', udtName: 'text' },
    { columnName: 'url', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
    { columnName: 'expired', dataType: 'bool', udtName: 'boolean' },
    { columnName: 'expires_at', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  invoices: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'customer', dataType: 'text', udtName: 'text' },
    { columnName: 'subscription', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'total', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'period_start', dataType: 'timestamp', udtName: 'timestamp' },
    { columnName: 'period_end', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  mandates: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'payment_method', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'type', dataType: 'text', udtName: 'text' },
  ],
  payouts: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    // { columnName: 'arrival_date', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    // { columnName: 'statement_descriptor', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  prices: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'active', dataType: 'bool', udtName: 'boolean' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'product', dataType: 'text', udtName: 'text' },
    // { columnName: 'unit_amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'type', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  products: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'name', dataType: 'text', udtName: 'text' },
    { columnName: 'active', dataType: 'bool', udtName: 'boolean' },
    // { columnName: 'default_price', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
    { columnName: 'updated', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  refunds: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'charge', dataType: 'text', udtName: 'text' },
    { columnName: 'payment_intent', dataType: 'text', udtName: 'text' },
    { columnName: 'reason', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  // setup_attempts: [
  //   { columnName: 'id', dataType: 'text', udtName: 'text' },
  // { columnName: 'application', dataType: 'text', udtName: 'text' },
  // { columnName: 'customer', dataType: 'text', udtName: 'text' },
  // { columnName: 'on_behalf_of', dataType: 'text', udtName: 'text' },
  // { columnName: 'payment_method', dataType: 'text', udtName: 'text' },
  // { columnName: 'setup_intent', dataType: 'text', udtName: 'text' },
  // { columnName: 'status', dataType: 'text', udtName: 'text' },
  // { columnName: 'usage', dataType: 'text', udtName: 'text' },
  //   { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  // ],
  // setup_intents: [
  //   { columnName: 'id', dataType: 'text', udtName: 'text' },
  // { columnName: 'client_secret', dataType: 'text', udtName: 'text' },
  // { columnName: 'description', dataType: 'text', udtName: 'text' },
  // { columnName: 'customer', dataType: 'text', udtName: 'text' },
  // { columnName: 'payment_method', dataType: 'text', udtName: 'text' },
  // { columnName: 'status', dataType: 'text', udtName: 'text' },
  // { columnName: 'usage', dataType: 'text', udtName: 'text' },
  //   { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  // ],
  subscriptions: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'customer', dataType: 'text', udtName: 'text' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    // {
    //   columnName: 'current_period_start',
    //   dataType: 'timestamp',
    //   udtName: 'timestamp',
    // },
    // {
    //   columnName: 'current_period_end',
    //   dataType: 'timestamp',
    //   udtName: 'timestamp',
    // },
  ],
  // tokens: [
  //   { columnName: 'id', dataType: 'text', udtName: 'text' },
  //   { columnName: 'type', dataType: 'text', udtName: 'text' },
  //   { columnName: 'client_ip', dataType: 'text', udtName: 'text' },
  //   { columnName: 'used', dataType: 'bool', udtName: 'boolean' },
  //   { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  // ],
  topups: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    { columnName: 'status', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
  transfers: [
    { columnName: 'id', dataType: 'text', udtName: 'text' },
    { columnName: 'amount', dataType: 'bigint', udtName: 'int8' },
    { columnName: 'currency', dataType: 'text', udtName: 'text' },
    { columnName: 'description', dataType: 'text', udtName: 'text' },
    { columnName: 'destination', dataType: 'text', udtName: 'text' },
    { columnName: 'created', dataType: 'timestamp', udtName: 'timestamp' },
  ],
};

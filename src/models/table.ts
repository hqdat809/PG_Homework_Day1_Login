export interface ITableItem {
  approved: boolean;
  async_status: string;
  canceled: boolean;
  company_id: string;
  confirmed: boolean;
  currency: string;
  date_canceled: string | null;
  date_confirmed: string | null;
  date_fulfilled: string | null;
  date_matched: string | null;
  date_processed: string | null;
  date_received: string | null;
  date_released: string | null;
  fees: number;
  fulfilled: boolean;
  is_premium: boolean;
  matched: boolean;
  number_of_recipients: number;
  payment_type: string;
  payroll_id: string;
  received: boolean;
  released: boolean;
  subpayroll_ids: string[];
  time_created: string;
  volume_input_in_input_currency: number;
}

export interface FilterState {
  status: string | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  invoice: string | undefined;
}

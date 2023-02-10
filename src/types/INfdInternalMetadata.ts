interface INfdInternalMetadata {
  asaid: string;
  category: 'common' | 'curated' | 'premium';
  commission1: string;
  commission1Agent: string;
  contractLocked: '0' | '1';
  highestSoldAmt: string;
  name: string;
  owner: string;
  saleType: 'auction' | 'buyItNow';
  seller: string;
  timeChanged: string;
  timeCreated: string;
  timePurchased: string;
  ver: string;
}

export default INfdInternalMetadata;

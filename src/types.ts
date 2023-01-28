export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: number;
  price: number;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  coinrankingUrl: string;
  volume: string;
};

export type Article = {
  type: string;
  name: string;
  url: string;
  image: {
    type: string;
    thumbnail: {
      type: string;
      contentUrl: string;
      width: number;
      height: number;
    };
    isLicensed: boolean;
  };
  description: string;
  datePublished: Date;
};

// uuid:"Qwsogvtv82FCd"
// symbol:"BTC"
// name:"Bitcoin"
// color:"#f7931A"
// iconUrl:"https://cdn.coinranking.com/Sy33Krudb/btc.svg"
// marketCap:"159393904304"
// price:"9370.9993109108"
// btcPrice:"1"
// listedAt:1483228800
// change:"-0.52"
// rank:1
// sparkline: [...strings]
// coinrankingUrl:"https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc"
// 24hVolume:"6818750000"

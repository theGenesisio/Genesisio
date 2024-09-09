import React, { useEffect } from "react";

const TradingViewTickersWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "BITSTAMP:BTCUSD",
          title: "Bitcoin",
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "Ethereum",
        },
        {
          description: "",
          proName: "COINBASE:LTCUSD",
        },
        {
          description: "",
          proName: "COINBASE:USDTUSD",
        },
        {
          description: "",
          proName: "BINANCE:BNBUSD",
        },
      ],
      isTransparent: true,
      showSymbolLogo: true,
      colorTheme: "dark",
      locale: "en",
    });
    document
      .getElementById("tradingview-tickers-widget-container")
      .appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container mb-5"
      id="tradingview-tickers-widget-container"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};
export default TradingViewTickersWidget;
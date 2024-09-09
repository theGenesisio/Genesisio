import React, { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR to USD",
        },
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
          proName: "BITSTAMP:BTCUSD",
        },
        {
          description: "",
          proName: "COINBASE:ETHUSD",
        },
        {
          description: "",
          proName: "BINANCE:BNBUSD",
        },
        {
          description: "",
          proName: "BITSTAMP:USDTUSD",
        },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });
    document.getElementById("tradingview-widget-container").appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-widget-container"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;

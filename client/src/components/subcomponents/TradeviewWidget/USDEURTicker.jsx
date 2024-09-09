import React, { useEffect } from "react";

const TradingViewSingleQuoteWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "FX:EURUSD",
      width: "300",
      isTransparent: true,
      colorTheme: "dark",
      locale: "en",
    });
    document
      .getElementById("tradingview-single-quote-widget-container")
      .appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-single-quote-widget-container"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewSingleQuoteWidget;

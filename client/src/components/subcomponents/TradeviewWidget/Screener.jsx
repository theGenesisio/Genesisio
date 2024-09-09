import React, { useEffect } from "react";

const TradingViewScreenerWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en",
      isTransparent: true,
    });
    document
      .getElementById("tradingview-screener-widget-container")
      .appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-screener-widget-container"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewScreenerWidget;

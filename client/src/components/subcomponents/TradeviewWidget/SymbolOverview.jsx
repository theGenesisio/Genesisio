// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "BINANCE:BTCUSDT|1D"
            ],
            [
              "BITSTAMP:BTCUSD|1D"
            ],
            [
              "COINBASE:BTCUSD|1D"
            ],
            [
              "BINANCE:ETHUSDT|1D"
            ],
            [
              "BINANCE:SOLUSDT|1D"
            ],
            [
              "COINBASE:ETHUSD|1D"
            ],
            [
              "COINBASE:SOLUSD|1D"
            ],
            [
              "CRYPTO:BTCUSD|1D"
            ],
            [
              "BINANCE:XRPUSDT|1D"
            ],
            [
              "BINANCE:BTCUSD|1D"
            ],
            [
              "BINANCE:DOGEUSDT|1D"
            ],
            [
              "BINANCE:PEPEUSDT|1D"
            ],
            [
              "BINANCE:NOTUSDT|1D"
            ],
            [
              "BINANCE:ADAUSDT|1D"
            ],
            [
              "BITSTAMP:XRPUSD|1D"
            ],
            [
              "BINANCE:SOLUSD|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": true,
          "showMA": true,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "gridLineColor": "rgba(24, 72, 204, 0.06)",
          "lineWidth": 2,
          "lineType": 0,
          "compareSymbol": {
            "symbol": "BINANCE:BTCUSDT",
            "lineColor": "#FF9800",
            "lineWidth": 2,
            "showLabels": true
          },
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);

import React from 'react'
import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-"
    return (
      <>
          <div className="flex min-h-screen home-wrapper">
              <section className="grid w-full gap-8 home-section">
                  <div className="md:col-span-1 xl:col-span-1">
                      <TradingViewWidget
                          title="Market Overview"
                          config = {MARKET_OVERVIEW_WIDGET_CONFIG}
                          className="custom-chart"
                          scriptUrl={`${scriptUrl}market-overview.js`}
                      />
                  </div>
                  <div className="md:col-span-1 xl:col-span-2">
                      <TradingViewWidget
                          title="Stock Heatmap"
                          config = {HEATMAP_WIDGET_CONFIG}
                          className="custom-chart"
                          scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      />
                  </div>
              </section>
              <section className="grid w-full gap-8 home-section">
                  <div className="h-full md:col-span-1 xl:col-span-1">
                      <TradingViewWidget
                          config = {TOP_STORIES_WIDGET_CONFIG}
                          className="custom-chart"
                          scriptUrl={`${scriptUrl}timeline.js`}
                      />
                  </div>
                  <div className="h-full md:col-span-1 xl:col-span-2">
                      <TradingViewWidget
                          config = {MARKET_DATA_WIDGET_CONFIG}
                          className="custom-chart"
                          scriptUrl={`${scriptUrl}market-quotes.js`}
                      />
                  </div>
              </section>
          </div>
      </>
    )
}
export default Home

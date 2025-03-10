import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
//import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../services/cryptoApi";

const { Title } = Typography;

function HomePage() {
  //const { data, isFetching } = useGetCryptosQuery(10);
  const dispatch = useDispatch();
  const cryptoState = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto(10));
  }, [dispatch]);

  const coins = cryptoState.crypto;

  console.log(coins);
  const globalStats = coins?.stats;

  //if (loading) return <Loader />;
  if (!globalStats) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.total ?? 0}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges ?? 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap ?? 0) + "T"}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume ?? 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets ?? 0)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default HomePage;

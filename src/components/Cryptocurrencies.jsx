import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { fetchCrypto } from "../services/cryptoApi";

function Cryptocurrencies({ simplified }) {
  const [count, setCount] = useState(simplified ? 10 : 100);
  const dispatch = useDispatch();
  const cryptoState = useSelector((state) => state.crypto);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCount(simplified ? 10 : 100);
  }, [simplified]);

  useEffect(() => {
    console.log("Fetching with count:", count);
    dispatch(fetchCrypto(count));
  }, [dispatch, count]);

  console.log("Simplified:", simplified);
  console.log("Count:", count);
  console.log(cryptoState);

  const cryptoList = cryptoState.crypto;
  const loading = cryptoState.loading;

  useEffect(() => {
    const filteredData = cryptoList?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  console.log(cryptos);

  if (loading) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;

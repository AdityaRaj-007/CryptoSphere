import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import {
  useGetExchangesQuery,
  useGetExchangeDataQuery,
} from "../services/cryptoExchangesApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetExchangesQuery();
  //console.log(exchangesList);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]}>
        <div className="exchange-div"></div>
        <Col span={10}>Exchanges</Col>
        <Col span={10}>24h Trade Volume</Col>
        {/* <Col span={8}>No of Listed Coins</Col> */}
      </Row>
      <div className="exchange-div"></div>
      <Row gutter={[32, 32]}>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange["trust_score_rank"]}
                showArrow={false}
                header={
                  <Row key={exchange["trust_score_rank"]}>
                    <Col span={11}>
                      <Text>
                        <strong>{exchange["trust_score_rank"]}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange["trade_volume_24h_btc"])}
                    </Col>
                    {/* <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col> */}
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
                <br />
                <p>
                  Visit the webiste at <a href={exchange.url}>{exchange.url}</a>
                </p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;

import React, { useEffect, useState } from "react";
import { Select, Row, Col, Typography, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
//import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../services/cryptoApi";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  //const { data } = useGetCryptosQuery(100);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.crypto);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  console.log(cryptoNews); // Check response structure

  useEffect(() => {
    dispatch(fetchCrypto(100));
  }, [dispatch]);

  if (!cryptoNews?.articles) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option key={currency.name} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.urlToImage || demoImage}
                  alt="news"
                  className="news-image"
                />
              </div>
              <p className="news-description">
                {news.description?.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.urlToImage || demoImage} alt="news" />
                  <Text className="provider-name">{news.source?.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

//export default News;

export default News;

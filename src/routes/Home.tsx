import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies } from "../api";
import { makeImgPath } from "../utils";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMovieResult {
  dates: {
    maximum: String;
    minimum: String;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 15px;
`;

const OverView = styled.p`
  font-size: 25px;
  width: 50%;
  line-height: 35px;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImgPath(data?.results[1].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

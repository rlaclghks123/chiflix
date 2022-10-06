import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImgPath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
  margin-bottom: 200px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.p`
  font-size: 25px;
  width: 50%;
  line-height: 30px;
`;

const Slider = styled.div`
  top: -100px;
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 200px;

  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center;
  font-size: 66px;
`;

const rowVari = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};
const offset = 6;
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);

  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving(prev => !prev);

  const toggelBtn = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = data.results.length - 1;
      const MaxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex(prev => (prev === MaxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={toggelBtn}
            bgphoto={makeImgPath(data?.results[1].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVari}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map(movie => (
                    <Box
                      bgphoto={makeImgPath(movie.backdrop_path || "", "w500")}
                      key={movie.id}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

import { generator } from "@ce1pers/use-page";
import { IGeneratePageData } from "@ce1pers/use-page/types";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ATOM_MOVIE_SELECTED_ID } from "../../atoms/movies/atoms.movies.common";
import { commonColors } from "../../styles/themes";
import { makeContentImagePath } from "../../utils/imageUtils";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 10px;
  padding: 0px 60px;
`;

const ContentTitle = styled.h3`
  cursor: default;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    color: ${(props) => props.theme.colors.sexyRed};
  }
`;

const Body = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
`;

const Arrow = styled.div`
  position: relative;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 15px;
  z-index: 2;
  transition: 0.2s ease-in-out;
  height: 100%;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    border-color: white;
    color: ${(props) => props.theme.colors.sexyRed};
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  padding: 0 60px;
`;

const Column = styled(motion.div)`
  width: 100%;
  height: 170px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  cursor: pointer;
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
`;

const ItemThumbnail = styled.div<{ imageUrl: string | undefined }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
`;

const ItemInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  padding: 10px 5px;
`;

// Variants.
const RowVariants = {
  ready: {
    x: window.outerWidth + 10,
  },
  in: {
    x: 0,
  },
  out: {
    x: -window.outerWidth - 10,
  },
};

const ColumnVariants = {
  ready: {
    scale: 1,
  },
  in: {},
  out: {},
  hover: {
    scale: 1.25,
    y: -30,
    boxShadow: `0 0 5px 1px ${commonColors.sexyRed}`,
    transition: {
      delay: 0.5,
    },
  },
};

interface IHorizontalContentsProps {
  title: string;
  list?: any[];
}

const HorizontalContents = ({ title, list = [] }: IHorizontalContentsProps) => {
  // Hooks.
  const pager = generator({
    take: 5,
    data: list,
  });

  const setContentId = useSetRecoilState(ATOM_MOVIE_SELECTED_ID);

  // States.
  const [pages, setPages] = useState<IGeneratePageData[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Handlers.
  const next = () => {
    if (pages.length - 1 > pageIndex) {
      setPageIndex((p) => p + 1);
    }
  };

  const previous = () => {
    if (pageIndex > 0) {
      setPageIndex((p) => p - 1);
    }
  };

  const onColumnClick = (id: number) => {
    console.log(id);
    setContentId(id);
  };

  // Observers.
  useEffect(() => {
    if (list.length) {
      const generated = pager.generate();
      setPages(generated.pages);
    }
  }, [list]);

  return (
    <Container>
      <Header>
        <ContentTitle>{title}</ContentTitle>
      </Header>

      <Body>
        <Arrow key="arrow-left" onClick={previous}>
          <span>{"<"}</span>
        </Arrow>
        <Arrow key="arrow-right" onClick={next}>
          <span>{">"}</span>
        </Arrow>
        {pages[pageIndex] ? (
          <AnimatePresence initial={false}>
            <Row
              key={pageIndex}
              variants={RowVariants}
              initial="ready"
              animate="in"
              exit="out"
            >
              {pages[pageIndex].data.map((page, i) => (
                <Column
                  key={page.id}
                  variants={ColumnVariants}
                  animate="in"
                  exit="out"
                  whileHover="hover"
                  onClick={() => onColumnClick(page.id)}
                  // layoutId={page.id + ""}
                >
                  <ItemThumbnail
                    imageUrl={makeContentImagePath(page.poster_path, "w500")}
                  />
                  {page.title ? (
                    <ItemInfoWrapper>
                      <span>{page.title}</span>
                      <span>{page.vote_average}</span>
                    </ItemInfoWrapper>
                  ) : null}
                </Column>
              ))}
            </Row>
          </AnimatePresence>
        ) : null}
      </Body>
    </Container>
  );
};

export default HorizontalContents;

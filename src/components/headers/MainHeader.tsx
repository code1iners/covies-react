import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, PathMatch, useMatch } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

const Navigation = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.headers.backgroundColor};
  color: ${(props) => props.theme.colors.headers.textColor};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

interface ILogoProps {
  isHome?: PathMatch<string> | null;
}

const Logo = styled(motion.button)<ILogoProps>`
  margin-right: 40px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: bolder;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.headers.textColor};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.colors.sexyRed};
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  grid-gap: 30px;
`;

const LinkItem = styled.li`
  list-style: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
  transition: 0.2s ease-in-out;
  position: relative;
  a {
    display: flex;
    justify-content: center;
  }
`;

const LinkItemIndicator = styled(motion.span)`
  width: 100%;
  height: 1px;
  border-radius: 5px;
  position: absolute;
  bottom: -5px;
  background-color: ${(props) => props.theme.colors.sexyRed};
`;

const SearchForm = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 20px;
    cursor: pointer;
    z-index: 1;
  }
`;

const SearchInput = styled(motion.input)`
  min-width: 200px;
  padding: 7px 10px 7px 30px;
  border: 1px solid gray;
  position: absolute;
  left: -210px;
  transform-origin: right center;
  letter-spacing: 1.25px;
  font-size: 0.8rem;
  border-radius: 1px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: white;
  &:focus {
    outline: none;
  }
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function MainHeader() {
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const isHome = useMatch("/");
  const isMovie = useMatch("/movies/*");
  const isTv = useMatch("/tv/*");
  const navAnimation = useAnimation();

  const onSearchClick = () => setIsSearchOpened((previous) => !previous);
  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info(event);
  };
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 40) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Navigation variants={navVariants} initial="top" animate={navAnimation}>
      <Column>
        <Link to="/">
          <Logo>Covies</Logo>
        </Link>
        <Links>
          <LinkItem>
            <Link to="movies">
              Movie
              {isMovie ? <LinkItemIndicator layoutId="indicator" /> : null}
            </Link>
          </LinkItem>
          <LinkItem>
            <Link to="tv">
              Tv {isTv ? <LinkItemIndicator layoutId="indicator" /> : null}
            </Link>
          </LinkItem>
        </Links>
      </Column>

      <Column>
        <SearchForm onSubmit={onSearchSubmit}>
          <motion.svg
            onClick={onSearchClick}
            animate={{ x: isSearchOpened ? -205 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <SearchInput
            transition={{ type: "linear" }}
            animate={{ scaleX: isSearchOpened ? 1 : 0 }}
            placeholder="Search movie or tv."
          />
        </SearchForm>
      </Column>
    </Navigation>
  );
}
export default MainHeader;

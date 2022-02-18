import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvPage from "./pages/TvPage";
import SearchPage from "./pages/SearchPage";
import MainHeader from "./components/headers/MainHeader";
import MoviePage from "./pages/MoviePage";

const Container = styled.div`
  margin-bottom: 70px;
`;

function App() {
  return (
    <Router>
      <MainHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;

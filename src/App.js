import React from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import { Cta, Brand, Navbar } from './components';
import { Chatbox } from './components';


import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Chatbox />
    <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <Cta />
    <Blog />
    <Footer />
  </div>
);


export default App;
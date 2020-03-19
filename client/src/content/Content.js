import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Museums from './pages/museums/Museums';
import NewMuseum from './pages/museums/NewMuseum';
import ShowMuseum from './pages/museums/ShowMuseum';
import Pieces from './pages/pieces/Pieces';
import NewPiece from './pages/pieces/NewPiece';
import ShowPiece from './pages/pieces/ShowPiece';

export default function Content(props) { 
  
  return (
    <div className="App-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/museums/add" component={NewMuseum} />
        <Route path="/museums/:dbid" component={ShowMuseum} />
        <Route path="/museums" component={Museums} />
        <Route path="/pieces/add" component={NewPiece} />
        <Route path="/pieces/:id" component={ShowPiece} />
        <Route path="/pieces" component={Pieces} />
      </Switch>
    </div>
  )
}
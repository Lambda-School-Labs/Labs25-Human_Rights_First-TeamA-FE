import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import { Landing } from './components/pages/Landing/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import 'antd/dist/antd.dark.less';
import { axiosBase } from './utils/axiosBase';
import Map from './components/pages/Incidents/Map/Map';
import LocalTimeline from './components/pages/Incidents/Timeline/Timeline';
// import 'antd/dist/antd.less';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axiosBase()
      .get('/incidents')
      .then(res => {
        setIncidents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/map">
        <Map incidents={incidents} />
      </Route>
      <Route path="/timeline">
        <LocalTimeline incidents={incidents} />
      </Route>
    </>
  );
}

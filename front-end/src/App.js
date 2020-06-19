import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import { Board } from './components/Board';
import { Register } from './components/Register';
import UserBoardList from './components/UserBoard/UserBoardList';
import UserBoardPost from './components/UserBoard/UserBoardPost';
import UserBoardDetails from './components/UserBoard/UserBoardDetails';
import UserBoardUpdate from './components/UserBoard/UserBoardUpdate';
import BoardUpdate from './components/BoardUpdate';
import BoardDetail from './components/BoardDetail';
import UserRegister from './components/UserRegister';
import UserManage from './components/UserManage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/userRegister" component={UserRegister}/>
          <Route exact path="/manage" component={UserManage}/>
          <Route path="/admin" component={Board}/>
          <Route path="/register" component={Register}/>
          <Route path="/board/:id" component={BoardDetail}/>
          <Route path="/boardUpdate/:id" component={BoardUpdate}/>
          <Route path="/userboard" component={UserBoardList}/>
          <Route path="/userboardpost" component={UserBoardPost}/>
          <Route path="/post/:id" component={UserBoardDetails}/>
          <Route path="/postUpdate/:id" component={UserBoardUpdate}/>
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, {useState,useContext} from 'react'
import App from './App';
import CallApp from './components/CallApp/CallApp';
import {StateContext} from './StateProvider';
import { BrowserRouter, Switch, Route, useParams, state, Link, Redirect } from "react-router-dom";
import ButtonAppBar from './components/Navbar';
// import db from 
import Chat from './components/MainChat';
// import 

function MainApp() {

    const {video,setVideo}= useContext(StateContext);


    return (
        <>
        <App/>
        {/* // <BrowserRouter>
    <Switch> */}
            {/* <Route exact path="/chat" component={App}/>
            <Route exact path="/chat/rooms/:roomId">
             <Chat />
            </Route>
            <Route exact path="/videoCall" component={CallApp}/> */}

            {/* <Route exact path="/list/:id/:slug" component={PlaylistList1}/>
             <Route exact path="/login" component={LogReg}/> */}
             {/* <Route exact path="/upsolve/codeforces" component={Codeforces}/>  
             <Route exact path="/upsolve/atcoder" component={Atcoder}/>  
             <Route exact path="/upsolve/codechef" component={Codechef}/>  
             <Route exact path="/" component={Homepage}/>
             <Route exact path="/profile/:id" component={profile} />
             <Route exact path="/:wise/:type" component={LaddersLevel1}/>
            <Route exact path="/:wise/:type/:slug" component={LaddersQuestionPage1}/>
            <Route exact path="/:wise/:type/:slug?page=1" component={LaddersQuestionPage1}/>
            <Route exact path="/problems" component={ProblemsPage1}/>
            <Route exact path="/change_password_request" component={changePassForm}/>
            <Route exact path="/email-verified" component={EmailVerfiedMsg}></Route>
             
             {/* <Route exact path="/laddersLevel/topic/page1" component={LaddersQuestionPage}/> */}
             
            
              
            {/* <Route exact path="/home" component={Homepage}/>
            <Route exact path="/createProfile" component={Info}/>
            <Route exact path="/forgPass" component={NewpassEmail}/>
            <Route exact path="/aboutus" component={AboutUsPage}/>
            
            <Route exact path="/setNewPass" component={NewPassSet}/>
            <Route exact path="/error" component={ErrorPage}/>
            
            <Route exact path="/updateProfile" component={UpdateProfile}/>
            <Route exact path="/privacy" component={PrivacyPolicy}/>
            <Route exact path="/terms" component={TermsAndConditions}/>
            
            <Link to="/contests/?difficulty=diff&platforms=plats" component={ContestPage1}/>
            <Link to="/problems/?difficulty=diff&platforms=plats" component={ProblemsPage1}/>
            <Link to="/:wise/:type/:slug?page=pageNo" component={LaddersQuestionPage1}/>
             */}
            
             
          {/* </Switch>
        </BrowserRouter>
        // <ButtonAppBar />
        // { video ? <CallApp />:<App/>} */}
        </>
    )
}

export default MainApp

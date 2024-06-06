import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
class Home extends React.Component {
  componentDidMount(){
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });
  }

  render() {

    return (

        <div className="maincontainer">


          <div className="container-fluid h-50">
            <div className="row justify-content-center h-100">
              <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group">
                    <input type="text" placeholder="Search..." name="" className="form-control search" />
                    <div className="input-group-prepend">
                      <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                    </div>
                  </div>
                </div>
                <div className="card-body contacts_body">
                  <ul className="contacts">
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>jassa</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                          <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                          <span>jassa</span>
                          <p>Taherah left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>jassa Mann</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                          <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                          <span>jassa Mann</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                          <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                          <span>jassa Mann</span>
                          <p>Rashid left 50 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer"></div>
              </div></div>
              <div className="col-md-8 col-xl-6 chat">
                <div className="card">
                  <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                      <div className="img_cont">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img" />
                        <span className="online_icon"></span>
                      </div>
                      <div className="user_info">
                        <span>Chat with jassa</span>
                        <p>1767 Messages</p>
                      </div>
                      <div className="video_cam">
                        <span><i className="fas fa-video"></i></span>
                        <span><i className="fas fa-phone"></i></span>
                      </div>
                    </div>
                    <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                    <div className="action_menu">
                      <ul>
                        <li><i className="fas fa-user-circle"></i> View profile</li>
                        <li><i className="fas fa-users"></i> Add to close friends</li>
                        <li><i className="fas fa-plus"></i> Add to group</li>
                        <li><i className="fas fa-ban"></i> Block</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body msg_card_body">
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                      <div className="msg_cotainer">
                        Hi, how are you samim?
                        <span className="msg_time">8:40 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Hi jassa i am good tnx how about you?
                        <span className="msg_time_send">8:55 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                      <div className="msg_cotainer">
                        I am good too, thank you for your chat template
                        <span className="msg_time">9:00 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        You are welcome
                        <span className="msg_time_send">9:05 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                      <div className="msg_cotainer">
                        I am looking for your next templates
                        <span className="msg_time">9:07 AM, Today</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-4">
                      <div className="msg_cotainer_send">
                        Ok, thank you have a good day
                        <span className="msg_time_send">9:10 AM, Today</span>
                      </div>
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <div className="img_cont_msg">
                        <img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" className="rounded-circle user_img_msg" />
                      </div>
                      <div className="msg_cotainer">
                        Bye, see you
                        <span className="msg_time">9:12 AM, Today</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                      </div>
                      <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                      <div className="input-group-append">
                        <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


    )
  };
}
export default Home;
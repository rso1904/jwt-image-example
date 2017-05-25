import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
            }
        );
        let navProfile = (
            <div>
                <ul id="slide-out" class="side-nav">
                    <li><div class="userView">
                        <div class="background">
                            <img src="images/office.jpg"></img>
                        </div>
                        <a href="#!user"><img class="circle" src="images/yuna.jpg"></img></a>
                        <a href="#!name"><span class="white-text name">John Doe</span></a>
                        <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
                    </div></li>
                    <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div class="divider"></div></li>
                    <li><a class="subheader">Subheader</a></li>
                    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>
                <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
               </div> );
        return (
            <div>
                {navProfile}
            </div>
        );
    };
}

export default Profile;
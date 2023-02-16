
# Grouped-Up
Application where users can create groups and interact with group members. They can create group specific events and also have group video calls where a group member can choose to share video or screen. 

<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/main-dem.gif" alt="animated" />
</p>


# Composition
## Technologies used
* FrontEnd
    - React
* Backend
    - Firebase
    - (DB) Firestore
# How It Works
## Login/Signup
Users are greeted with a login/signup page. If account exists, they may log in normally. If they are new to the application, the user has the option to sign up. 

Error messages will display referencing the mistake the user makes with password or email.


<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/login-h.gif" alt="animated" />
</p>

## Main Application Functionality
Side Nav Bar will display 
- Link to **join an existing group** with available members to join
- Link to **create a new group**
- Dropdown menu to links of group pages of which the user is a member
- Direct link to signout


<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/sidenav.gif" alt="animated" />
</p>


### Join A Group

List of all available groups are shown. They display the group name, how many total members in the group and how many available spots. They may join group via buttton and will be directed to group page. This new added group will also be displayed on the side nav bar.


<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/join-group.gif" alt="animated" />
</p>

### Create a group

Users may also create a group via form under create-group link. Here they can speciy the name of the group and specify max members (range 2-6). Once created, they will be redirected to the group page. 

<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/create-group.gif" alt="animated" />
</p>


### Group Page 

This group page will display all information regarding the group. This includes all events associated with the group in list form as well as in a user friendly map which will have start and end date for each event. 


Users can create an event via create event button. 

<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/create-event.gif" alt="animated" />
</p>

In this page the users can also leave the group via leave group button.


<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/group-page.gif" alt="animated" />
</p>


### Video Call

Each group will have link to their respective group video calls. This will redirect them to a different server. 

The link to code for video call server: 

In this video call, users have the option to share, video, audio and/or screen. 


<p align="center">
  <img src="https://github.com/hassankaz1/grouped-up-project/blob/master/demo-gifs/video-call.gif" alt="animated" />
</p>



Credits to this creator as my video call functionality is built off of the tutorial below: 
[Tutorial](https://www.youtube.com/playlist?list=PLGmKMg3aRkXguVpBmQLtXbTXf1Fzd1sWt)

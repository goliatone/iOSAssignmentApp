## MyOm Application

MyOM is a private application distributed to EnterpriseX employees. New Users are sent an invite to register the application and load their preferences.

The application relies on a server to handle user invites, registration, token validation and managing user preferences.

To learm more about the server, read [here](#server).

### Carousel

User will open the application and will see a welcome page that is a Carousel View. This is an introductory section that shows three different items. Users can skip or move forward.


![01](/img/01_instructions.png)

![02](/img/02_details.png)

![03](/img/03_features.png)

### Invite

After the Carousel View the user is presented with a page with an input field asking for their invite code, e.g. **jbe8l8x7-16razyks8hk**.

The user would get a link to the invite page through a direct email. The Server provides an [endpoint for each](http://127.0.0.1:3000/invite/email/1) user to retrieve the registration code.

Users should enter this token in the iOS application, in the Invite Code screen. Once the User submits the token, the application will send an HTTP POST request to the Server with the token. If the token is valid, the Server responds with [a payload](#user-payload) that includes user information.

![04](/img/04_invite_code.png)

![05](/img/05_invite_code_validation.png)

### Profile

This payload includes an `accessToken` field. In order for Users to update their profile using the iOS application, the `accessToken` should be used to authenticate the user.

When the user enters the profile page, the MyOM app will query the server to get a quote for the user.

![06](/img/06_profile.png)

![07](/img/07_edit profile.png)


## Server 

The server relies on Node.js and `npm`. You can get a binary installer in this [link](https://nodejs.org/en/download/).

To start the server, from terminal change to the **server** directory. There you first need to install dependencies:

```
npm install
```

Then you can run the server using the following command:

```
npm start
```

You should be able to see the index page here: 

[http://localhost:3000](http://localhost:3000)


### Production Environment

We can run our server in a "production" environment. This means that it will open up a local tunnel and you can access the site over this URL:

[https://myom.localtunnel.me](https://myom.localtunnel.me)

To run the server in production:

```
npm run prod
```


### API

#### `GET /api/user/:id`

Returns the user matching the `:id` parameter.

If not User matching the ID is found it will return a **404**.

Example URL: 

[http://localhost:3000/api/user/2](http://localhost:3000/api/user/2)


#### User payload

```json
{
    "id": "2",
    "firstName": "andres",
    "lastName": "crespo",
    "username": "greenostrich315",
    "profilePicture": "https://randomuser.me/api/portraits/men/9.jpg",
    "token": "pmZfJSIc",
    "inviteCode": ""
}
```

#### `GET /api/user/:id/om?access_token=:token`

Returns a quote for the given user.

>Hey, I'm telling you, the pig-man is alive. The government has been experimenting with pig-men since the 50's. (Kramer - The Bris)

**NOTE**:
It requires an `access_token` to authenticate the user.
The parameter `:token` should be the value of the attribute `token` in the user payload.

#### `PUT /api/user/:id?access_token=:token`

Updates the user matching the ID parameter. It will return the modified user object.

**NOTE**:
It requires an `access_token` to authenticate the user.
The parameter `:token` should be the value of the attribute `token` in the user payload.

### Invite Endpoints

#### `GET /invite/email/:user`

Generate invite code for a given user.
It returns an HTML page with the invitation code the user has to use in the iOS application.

Example endpoint:

[http://localhost:3000/invite/email/1](http://localhost:3000/invite/email/1)

#### `POST /invite/ios/:invite`

Endpoint used by the iOS application to redeem an invitation code. 


---

## MyOM MVP

The team will be happy seeing a MVP with the following functionality:

* Show all screens in wireframes
* Enter Invite Code
* Validate code
* Once user is registerd go directly to their profile
* Show quote in profile
* Show edit profile view

If possible, make the profile view functional.

Some thoughts:

* Use any libraries that you would normally use. 
* You might not have enough time to finish everything, plan accordingly and pick what you decide to implement and what to leave for the extra time.
* Use pods? Good. You prefer something else, great.
* How do you architect an application so that can add features without investing too much time up-front?
* Do you usually write tests? Do you need to write tests?
* Where can you "cheat" and add a nice detail for cheap?


### Comments from the "team"

#### UX & Design

Carousel:

>Ideally, the User wouldn't have to see the carousel animation every time they open the application until they finally register.

Quotes:
>It would be cool if the User, once in their profile page, can pull to refresh the quote.

Animations:

>Adding animations is always a nice touch, as long as it does not detract from the functionality. Nice to have.

Gestures:

>Being able to navigate using gestures is the preferred option, better than clicking buttons.

Micro-interactions:

>Showing system status, highlighting changes, keeping context, visualizing input... you can enhance a Users experience focusing on the small details.


### Extra points

Typing the invite code is far from ideal. Our PM has decided improve the user experience, the request is to implement "deep links". When the user checks the invite email using their iPhone, a new link will show up in the website:

<a href="myom://signup?token=jbe9ofm7-yt28ks5ouai">Open directly using your MyOM app.</a>

Users should be able to skip the carousel and just see a validation screen, letting them know the invite is being processed.

![8](/img/08_deeplink_invite.png)


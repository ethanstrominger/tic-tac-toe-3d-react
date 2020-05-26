### Overview
Version 0.2.1 of this application tracks query criteria for events ("event queries").  Event queries can include source (meetup, eventbrite, general), key word, date range, and time range for when you can attend.  For example, you can specify that you are looking for Python events that occur within the next month between 6 and 9 PM.

Future versions will query event sources such as meetup and eventbrite to notify you when new events occur and existing events change.

The application requires you create an account.  You will only be able to see event searches that you create.  Options to create and list your event queries are available when you log in.  To edit or delete an event query, you can click on the link to the event query from the list.

### Technologies Used
- React, React Hooks
- JavaScript
- JSX
- HTML
- CSS
- bootstrap

### Related Repositories

Here is a complete list of the Github resources involved in developing this application:

Source code:
  - Client: https://github.com/ethanstrominger/event-finder-ultimate
  - Backend: https://github.com/ethanstrominger/event-finder-rails-api

Deployment
  - Client: https://ethanstrominger.github.io/event-finder-ultimate/#/
  - Backend APIs: https://mysterious-dusk-65019.herokuapp.com/event_searches

Templates
If you like what you see and would like to develop something similar, you can use the following templates.  These were based on templates provided by General Assembly and then evolved. The history of the original template and changes are listed in the commit history.
- Backend APIs: https://github.com/ethanstrominger/rails-api-with-tests-template
- Client: https://github.com/ethanstrominger/react-auth-hook-template

### Planning
I reviewed the requirements, decided on an approach, came up with a checklist of what I needed to do, and followed that checklist.  The steps included:

Kickoff
- Decide on project
- Create wireframes
- Create ERD
- Review with instructors
- Create templates with extra features
  -	Create a repository meant to be used as a future templates
  -	Clone and get backend template working
    	- Add tests
  - Clone and get front end and backend template working together
  - Change backend template to use movies entity so that the two templates work together and there is a good base.  I did this using RAILS SCAFFOLD feature and then figured out what was customized.  Looking at notes would have been more effective.
- Create new repositories for the front end and client project
- Copy the templates into the repositories
- Customize to use the event query resource

### Problem Solving
console.log, developer tool, and google were my friends.  I either traced from the beginning of the transaction until I saw something was not right or started where the problem occurred and traced back until I found where the issue was.

### Unsolved Problems / Future Features
- Displaying the rows in a table format.  It was possible to create a table with the data, but not with the links.
- More styling
- Retrieving events based on the criteria specified in the event queries.
  Meetup and EventBrite APIs have restrictions, so alternate APIs need to be found or web scraping used
- For a full list of stories, click [here](docs/stories.md).

### User Stories
See [user stories](docs/stories.md)

### Screen Shot
![Screen Shot](docs/screenshot.png?raw=true)

### Wireframes
![Home Page](docs/mockups/home-page-just-in-mind.png?raw=true)
![Sign Up](docs/mockups/sign-up.png?raw=true)
![Sign In](docs/mockups/sign-in.png?raw=true)
![Create](docs/mockups/create-just-in-mind.png?raw=true)
![Update](docs/mockups/update-just-in-mind.png?raw=true)
![List](docs/mockups/query-list-just-in-mind.png?raw=true)

### Installation and Deployment Instructions
See [setup docs](docs/setup.md) for set up instructions.

# Social Safe App
In preparation for this capstone project as part of my participation in General Assembly’s Software Engineering Immersive, I talked with a number of friends about what kind of app would be useful to them. Given the times in which we live, with the COVID pandemic, they all reported a sense of unease about going out to their favorite restaurants and other venues. This is on top of people working from home or having lost their jobs. As a result, they are spending a lot of time being isolated.  We all need to socialize and spend time with our friends and family, but we need to ensure that we’re being safe and smart about it. My friends wanted an app where they could learn about the outdoor spaces and social distancing practices of various eateries and gathering places. In addition, since we are in a temperate climate and it was fall, now turned to winter, they wanted to know which businesses had heat lamps. This all led to the design of the Social Safe app. Social Safe enables users to review restaurants and share general as well as social distance ratings, note the presence of heat lamps, and provide descriptive comments. And, it provides the general Yelp rating as a reference. Social Safe also can search the Yelp API by location. Search results are presented in the Social Safe format and can be added to the database with full functionality available. Users have the ability to add new entries and edit and delete records they’ve added.  

## To access the App
  * https://socialsafe.herokuapp.com/

## Planning
  * Wireframes: https://github.com/daniellescaturro/socialsafe-backend/blob/main/Social-Safe-Wireframes.pdf
  * Diagram of React folder structure: https://github.com/daniellescaturro/socialsafe-client/blob/main/React_Folder_Structure.png

##  User Story
The target user group is urban adults who like to go out to restaurants, cafes, pubs, and other venues to socialize with friends and family. However, the app can really be used by anyone who has an interest in socializing at the venues described and is concerned about social distancing.

  * To use the app, the user accesses it from their browser at the above link, which will open to the login page. 
  * If the user is new to the app, he/she/they will need to register through the Sign Up link below the Login in form. And, after that, he/she/they will need to Log In upon each use. 
  * Once the user is logged in, they will be brought to the homepage.

<p align="center">
	<img src="https://github.com/daniellescaturro/socialsafe-client/blob/main/SocialSafe_homepage.png">
</p>														  
														  

 * As you can see in the image above, there is basic navigation in the header for accessing the homepage through the Social Safe link and links to access My Favorites, Add New Restaurant and to Login and Logout.
 * This view is a listing of all the restaurants in the database via a Restaurant cards view. In addition to the items and ratings discussed in the introduction, cards also note the restaurant category (e.g., pizza). The restaurant name is a link that will bring the user to either the restaurant's website or the Yelp review page. There is also a link [See Details] that takes the user to a more detailed view of the restaurant. 
 * Users have the ability to mark their “favorite” restaurants by clicking the heart in the bottom left corner of the Restaurant card. Once marked as a favorite, the heart color fills in and the Restaurant will be displayed on the My Favorites page as seen below. The My Favorites view is identical to the homepage view.

 <p align="center">
	<img src="https://github.com/daniellescaturro/socialsafe-client/blob/main/SocialSafe_myfav.png">
</p>

When the favorite button is clicked again, the heart returns to an outline display and the record is removed from the My Favorites view. It can still be viewed on the homepage. 
In the image above you can also see the Edit and Delete buttons. Users have the ability to edit and delete records they add to the database.
Additionally, you can see the Review button on the bottom right side of the Restaurant card. Multiple users can review a restaurant. It includes a general rating, a social distance rating, and space for comments. Reviews can be viewed on the Restaurant Detail page seen below and accessed through the [See details] link on the Restaurant Card.  

<p align="center">
	<img src="https://github.com/daniellescaturro/socialsafe-client/blob/main/SocialSafe_showpage_top.png">
</p>
<p align="center">
	<img src="https://github.com/daniellescaturro/socialsafe-client/blob/main/SocialSafe_showpage_botton.png">				</p>
					  
 * Additionally, on the homepage users can conduct a live search of the Yelp API using location parameters. Records that are interacted with by clicking either the “favorite” or “review” buttons will be added to the database. Duplicates will not be entered into the database.  

## Technical Specifications
This game was created using Flask/Python, React, Semantic UI React and CSS. It is deployed on Heroku and requires no installation. 

## Forthcoming Features
 * In a future version of the application I plan to expand the search functionality beyond location parameter to include items such as cuisine, venue type, etc. And it needs improved functionality for adding restaurants from search than refreshing the screen.  The dropdown either needs to be removed or the results should be made clickable. 
 * I also plan to improve the user experience by consolidating and simplifying data entry where possible. For example, a user currently adds presence of head lamps on the Add New Restaurant or Edit Restaurant form but is unable to do so when reviewing a restaurant. I'd also like to add drop down lists for easier data entry. 
 * I would also like to better organize the list by sorting it alphabetically or giving the user the option on how to sort. 
 * Better presentation of information is also a goal. I’d like to use clickable “stars” for ratings and to reconfigure or reformat the data on the Restaurant cards, as they contain a lot of info, including collapsing space when the Edit and Delete buttons are not present. The forms and modals need better formatting and I’d like to add a Delete modal. The formatting on the Restaurant detail page could use upgrading visually as well as noting when and who made reviews. Also, when no review have been conducted yet, it should note this.
 * While the site is responsive, this needs improvement and the navigation bar is currently not responsive. I'd like for the links in the navigation bar and elsewhere to have hover and clicked formatting features.
 * Updating the navigation bar with conditional rendering on the login/logout buttons and include the name of the user once he/she/they logged in.  

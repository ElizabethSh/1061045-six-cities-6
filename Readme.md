# Training project «Six cities» [![Build status][travis-image]][travis-url]

* Student: [Lisa Shoshkina](https://up.htmlacademy.ru/react/6/user/1061045).
* Mentor: [Saymon Yakushev](https://htmlacademy.ru/profile/id1118791).

---

# Technical task

### About

Six Cities is a service for travelers who do not want to overpay for rental housing. Choose from six popular travel destinations and get an up-to-date list of rental deals. Detailed information about housing, showing the object on the map will help you quickly choose the best offer.

## Description of the functionality

### Application Pages

* The application consists of several pages: Main( /), Sign In( /login), Favorites( /favorites) (private), Room( /offer/:id).

* The page Favorites is available only to authorized users.

* If the user is logged in, then when they go to the page Sign In, they are redirected to the Main page.

* If the user is not logged in, then when they try to go to the private page, he is redirected to the “Sign In” ( /login) page .

* The header of each page displays a link to the "Sign In" page (if the user is not authorized) or the user's email (if the user is authorized).

* Clicking on the user's email in the header takes you to the page  Favorites (/favorites).

* Accessing a non-existent page (for example, via the address bar) does not lead to errors in the application, but is correctly handled by routing. The user is redirected to the "404" page. The design of the page is at the discretion of the student. In the simplest case, it can be a page with the text "404 Not Found" and a link to go to the main page of the application.

### Main Page

* The Main page displays a list of cities for which it is possible to request rental offers: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf.

* The server always returns information only for these six cities.

* After downloading the application, the first city from the list on the main page is always active immediately — Paris. Rental offers are loaded for this city.

* On the map, the offers are displayed as blue markers.

* When you change the city, the list of offers and the map are updated.

* The title of the offer list shows the number of available offers. Example of a valid title: 312 places to stay in Amsterdam.

* The "Favorites" button of each offer. Clicking on the "Favorites" button adds the card to your favorites. If the user is not logged in, then a redirect to the Sign In page is performed.

### List of offers

* The user can change the sorting of the list of offers.

* Clicking on the card title takes user to the page with detailed information about the offer.

* If there are no offers, then the inscription "No places to stay available" is displayed in the list, and a static image is displayed instead of the map.

### Map 

* All offers of the selected city are displayed on the map as blue markers.

* When you hover the cursor over the offer card, the marker corresponding to the ad turns orange. The item is valid only for the main page, the color of the marker should not change on the offer page.

### Offer Page

* The offers page (/offer) provides extended information about the object for rent

* Clicking on the "Favorites" button adds the card to favorites. If the user is not logged in, then a redirect is performed to the Sign In page.

* User reviews. The block header shows the total number of reviews.

* For authorized users, a form for sending a new review is displayed.

* A map with offers nearby is displayed under the list of reviews. The map shows no more than 3 offers nearby and the marker of the current offer. The offer markers are highlighted in blue. The marker of the current offer is highlighted in orange. There is no other functionality for a map with offers nearby.

* The cards of the submitted offers are displayed immediately below the map and contain the same set of information as on the main page.

* Reviews. No more than 10 reviews are displayed on the page. Reviews should be sorted from new to old (new at the top).

### Sign In Page

* To log in to the service, the user enters a username (email) and password. Since the service does not have the possibility of registration, the username and password can be any, but not empty.

* The correct email address must be entered in the "login" field.

* The page is only available to unauthorized users. Authorized users are redirected to the main page.

### Favorites Page

* The "Favorites" page is available only to authorized users. If the user is not logged in, then a redirect is performed to the "Sign In" page.

* The transition to the "Favorites" page occurs when user clicks on the email of an authorized user.

* The "Favorites" page displays all the offers that the user has added to favorites. Offers are grouped by city.

* If the user has not added any suggestions to favorites, then "Nothing yet saved"is displayed on the page.
---

<a href="https://htmlacademy.ru/intensive/react"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/react/logo-for-github.png"></a>

The repository was created for training on a professional online course «[React. Development of complex Front-end Applications](https://htmlacademy.ru/intensive/react)» from [HTML Academy](https://htmlacademy.ru).

[travis-image]: https://travis-ci.com/htmlacademy-react/1061045-six-cities-6.svg?branch=master
[travis-url]: https://travis-ci.com/htmlacademy-react/1061045-six-cities-6

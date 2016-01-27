---
layout: project
title: Founderati
slideshow:
 - html5: FullFounderatiDemo.mp4
   format: video/mp4
   thumbnail: thumbnail2.png
   autoplay: true
links:
 - title: Full source on Github (client)
   url: https://github.com/AustinStoneProjects/Founderati-client
 - title: Full source on Github (server)
   url: https://github.com/AustinStoneProjects/Founderati-Server
---

## About

Founderati is a website I built for University of Texas alumni and alumni of other universities which have decided to adopt the platform, including MIT. I developed Founderati this past spring semester with two friends, [Alexander Ventura](https://www.linkedin.com/in/alexmventura) and [Nicholas Sundin](https://www.linkedin.com/in/nsundin). We plan to open source this website and allow other developers at UT to continue to develop and maintain the site.

AngelList and LinkedIn are excellent tools, but these networks are so large that it returns to a game of “who you know” offline.  It is easy to get lost in the crowd.  Founders and investors alike need a better means of discovering and connecting with each other, and they need this to be filtered so that the quality and salience of the userbase remains extremely high.  They need a way to meet strangers for shared benefit.  There is no better filter than affinity, and this is the premise of Founderati.  Founderati is a network for entrepreneurs, investors and startup builders that is limited to a given university alumni community.  There are few icebreakers as strong as attending the same college.  To further ensure the quality of the network, Founderati is comprised only of invited individuals who must then complete an application that is reviewed for approval or rejection by an admin.  Simply put, startup-minded Founderati enables students and alumni to connect with each other without having to filter through spammers and goofballs.  Only the best of a given alumni are admitted.

Some of the main features of the site include:

* Ability to create a profile complete with skills, interests, job experience, and links to the profile owner's online presence at other domains (e.g. Twitter, LinkedIn, Facebook, personal website)

* Ability to create a profile for a company (startup). Startup profiles include a "wall" where people can post comments and news updates related to the startup.

* In-site messaging. Users can connect and message eachother on the site. Users can also endorse other users. More endorsements improves your ranking on the in-site search engine.

* A "trending startups" feature, which shows the startups that have been gaining endorsements/popularity recently.

* An approval system involving an admin panel. Before anyone can join the site, they need an invite code and approval by the admin operating from the admin panel. 

* Full text search for users and companies.

Some of the cool things I developed in this project:

* The UI and backend for typeahead skills and markets. The backend uses a [trie](https://en.wikipedia.org/wiki/Trie) to store the data for fast retreival.

* Almost all of the backend and database architecture.

* The UI for connecting to other users, messaging other users, much of the main profile UI, and the notifications dropdown.

* The site full text search engine and pagination system (both back-end and front-end).



## Technologies & Libraries Client

* [MithrilJS](https://lhorie.github.io/mithril/)
* [Gulp](http://gulpjs.com/)
* [Semantic UI](http://semantic-ui.com/)
* [BaconJS](https://baconjs.github.io/)

## Technologies & Libraries Server

* [Elastic](https://www.elastic.co/)
* [MongoDB](https://www.mongodb.org/)
* [Flask](http://flask.pocoo.org/)
* [Tornado](http://www.tornadoweb.org/en/stable/)

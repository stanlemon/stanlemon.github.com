---
layout: post
title: Sanctus.org JavaScript Edition
date: 2021-03-04T10:00-04:00
categories:
  - Life
  - Religion
  - Technology
permalink: /2021/03/04/sanctus-org-javascript-edition
draft: false
---

[Sanctus.org](https://sanctus.org) is a hobby project of mine. It started when I was in college at Concordia University, River Forest. My dorm floor started praying Matins in the morning before classes together. This was before the Lutheran Service Book had been published. We relied upon a set of Word documents to pick daily readings. I thought it would be neat to have a webpage that did this for us. My dorm mates helped type data and shortly thereafter I released the first version of the site.

<!-- excerpt -->

Since 2003 the site has existed in some form. [In 2012 I released a PHP version of the calculator.](https://github.com/stanlemon/lectionary) This is the code responsible for determining which week of the Christian calendar a date is. I did not release the rest of the site because it was a hot mess. For a while now I've dreamed of making a JavaScript version of the whole thing. I had a few goals:

1. It should be approachable to others with basic coding skills.
2. Easily incorporated into a church website if someone wants.
3. Include data and rendering tools as well as the calculator.

I would have never dreamed of doing this in JavaScript in 2003 because the state of JavaScript was a mess. Plus, browsers were not optimized for JavaScript-based applications as they are today.

I'm excited to share that the JavaScript version is real and you can find it on [GitHub](https://github.com/stanlemon/lectionary-js). [You can also see it in action in your web browser.](http://stanlemon.com/lectionary-js/)

I still have a lot to do. While the calculator has extensive test coverage, the rendering library does not. I would also like to clean up some of the code on the daily view. None of this makes the code unapproachable. It's just that it could be better.

I have not shut down the old version of [sanctus.org](https://sanctus.org). There are a few things the new version does not have. The original version includes the scripture texts, but the new version only includes links. The original version also included daily Psalms, but the new does not. The truth there is that I have no idea where I found those Psalm selections. I'd like to include Psalm readings, but I'm not sure where to source them yet.

I'm excited about this new version. I hope that it'll be more accessible to folks who want to experiment with different use cases. The site has focused on the one-year lectionary for all of its life. The new code base would make a three-year version pretty simple to build. This is the sort of thing I wanted to unlock.

Please check out the new version. If you find issues, let me know. If you've been a user of Sanctus.org over the years I appreciate your support.

---
layout: default
metadata:
  description: Stan Lemon - husband, dad, Steelers fan and software developer. Personal blog featuring tech, family life, and reviews.



  keywords: Stan Lemon, coding, Indianapolis, Steelers, Dollar & Sense app, personal, technology, family
---

<div class="text-center">
<h4>My name is Stan Lemon, I am a husband, dad, Steelers fan and software developer.</h4>
</div>

My [wife](https://saralemon.com) and I live in Indianapolis, Indiana with our three kids.  I studied Theology and Biblical Languages at Concordia University River Forest, where I received a Bachelor of Arts degree.  After college I took up software development.  When I'm not working I enjoy spending time with my kids, reading Star Wars books and watching the [Pittsburgh Steelers](https://steelers.com).

I built an *iOS, watchOS and macOS* app for my kids called [Dollar & Sense](http://dollarandsense.app), which we use to track their chores savings. You can download it on the [App Store](https://apps.apple.com/us/app/dollar-sense/id1631766637?itsct=apps_box_badge&itscg=30200). It's completely *free*.

Football fan? [Check out _Pickem!_](http://pickem.stanlemon.com).

Occasionally I'll [post things I've written](/page/1).

{% if collections.pinnedPosts.size > 0 %}

### Some of my favorites
{%- for post in collections.pinnedPosts %}
- [{{ post.data.title }}]({{ post.url }})
{%- endfor %}

{% endif %}

{% if collections.recentPosts.size > 0 %}

### Recent
{%- for post in collections.recentPosts %}
- [{{ post.data.title }}]({{ post.url }}) - {{ post.data.date | date: "%B %d, %Y" }}
{%- endfor %}

{% endif %}

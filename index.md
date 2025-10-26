---
layout: default
metadata:
  description: Stan Lemon is a husband, dad, Steelers fan and software developer from Indianapolis. Read about technology, software development, budgeting, and life with a family.
  keywords: coding, Indianapolis, Steelers, Fever, Dollar & Sense app, personal, technology, family
---

<div class="text-center">
<h4>My name is Stan Lemon, I am a husband, dad, Steelers fan and software developer.</h4>
</div>

My [wife](https://saralemon.com) and I live in Indianapolis, Indiana with our three kids.  I studied Theology and Biblical Languages at Concordia University River Forest, where I received a Bachelor of Arts degree.  After college I took up software development.  When I'm not working I enjoy spending time with my kids, reading watching the [Pittsburgh Steelers](https://steelers.com), and the [Indiana Fever](https://fever.wnba.com).

I built an *iOS, watchOS and macOS* app for my kids called [Dollar & Sense](http://dollarandsense.app), which we use to track their chores savings. You can download it on the . It's completely *free*.

Occasionally I'll [post things I've written](/page/1).

### Some of my projects

- [Life with a Twist of Lemon](https://twistoflemonpod.com) - a podcast about life, faith, family and technology with my friend [Jon Kohlmeier](https://jonkohlmeier.com).
- [Dollar & Sense](https://dollarandsense.app) - a _free_ app on the [App Store](https://apps.apple.com/us/app/dollar-sense/id1631766637?itsct=apps_box_badge&itscg=30200) to help kids learn about money and savings.
- [Lutheran Lectionary Project - aka Sanctus](https://sanctus.org)- for Lutherans on the one year lectionary.
- [Pickem](https://pickem.stanlemon.com) for football fans (and my kids) to know who to root for each week.
- [Who Can My Daughter Date?](https://who-can-my-daughter-date.stanlemon.com) - a helpful site for my daughters so that they know how to navigate dating.

{% if collections.pinnedPosts.size > 0 %}

### Some of my favorite posts
{%- for post in collections.pinnedPosts %}
- [{{ post.data.title }}]({{ post.url }})
{%- endfor %}

{% endif %}

{% if collections.recentPosts.size > 0 %}

### Some recent posts
{%- for post in collections.recentPosts %}
- [{{ post.data.title }}]({{ post.url }}) - {{ post.data.date | date: "%B %d, %Y" }}
{%- endfor %}

{% endif %}

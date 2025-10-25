---
layout: post
title: Keeping Your Internet Safe with NextDNS
date: 2021-01-15T10:00-04:00
categories:
  - Life
  - Technology
permalink: /2021/01/15/keeping-your-internet-safe-with-nextdns/
metadata:
  description: The internet is like the Wild Wild West, without the awesome soundtrack and dance moves of Will Smith.
  keywords: personal, family, lifestyle, AWS, Git, REST API, iPhone
---

The internet is like the Wild Wild West, without the awesome soundtrack and dance moves of Will Smith. The truth is it’s a really dangerous place, for kids as well as adults. It gets harder every day to know what is safe and understand the consequences of interacting with all of the digital services that make up our world. As a father of three who are increasingly becoming connected it’s even harder, because the last thing I want is them stumbling into a snake’s nest. I’ve tried a number of things over the years, but I feel like for the first time my home internet is safe for me, my wife and my kids. Let me introduce you to [NextDNS](https://nextdns.io).

<!-- excerpt -->

{% image "./assets/nextdns-rokutv.jpg", "On the right hand side of the Roku home screen there is usually an ad." %}

It’s worth mentioning what pushed me over the edge to revisit my current ad blocking and tracker blocking strategy. Around the time the new Borat movie was released Amazon was buying ads everywhere, and one evening I turned on our Roku TV to find a picture of Borat in a Mankini plastered in the ad spot to the right of my Roku channels. My kids were in the room, but fortunately were paying attention to other things. To say I was mad would be an understatement. I was determined to find a way to block ads on the Roku TV. Many friends recommended setting up a [pi-hole](https://pi-hole.net), but that involved more work than I wanted to take on. After much trial and error I’m happy to report [NextDNS](https://nextdns.io) blocks the ad section on the Roku and also covers a ton of other nefarious ads and trackers. Thanks to [NextDNS](https://nextdns.io) my home internet is much safer for me and my family.

* Bottom line: Internet safety for you and your family is really hard.
* There are essentially three categories you need to protect on: Tracking, ads and domains.
* Tracking can get down right creepy. Everyone needs to make a personal decision about how much they want various websites to profile them. I’m somewhere between nothing and nothing.
* A few years back Apple introduced ad blockers to much fanfare. The problem is that much of our engagement with content actually happens in Apps where these ad blockers have no ability to protect you.
* Many ad blockers also block tracking too. The thing is, most people I know do not have ad blockers installed on their computers and definitely not on their mobile devices.
* It is worth mentioning that not all ad blockers are created equal. Some actually do their own tracking and that’s how they make money. Buyer beware!
* While some ad blockers are nefarious, many are not. My favorite has been Better, which I had been using on my Mac, iPhone and iPad.
* Deploying an ad blocker app to your whole family is manual and a true headache.
* Apple recently bundled tracking protection into its Safari web browser, which is great, but that does not extend into apps.
* Not all ads are bad, and some are genuinely necessary for content providers to make money to continue to produce content. Unless you’re comfortable paying for all of your content on the internet you have to tolerate (and accept?) some ads, or the services that provide free ad-based content will cease to do so.
* Many content providers have little visibility into what sort of ad garbage might be tacked onto their content. This is especially true for free games in the App Store. Another example would be my local newspaper’s app, which has some of the most egregious and self-compromising ads.
* Many routers now ship with various content filters. These can be handy, but they’re more likely to be a pain to setup. Plus, this is not the primary business of these products and the quality of their content filters are just not top tier in my opinion.
* Disney actually has a product in this space called [Circle](https://meetcircle.com), specifically for kids’ use of the internet. It’s expensive ($9.99/month plus the central device). I think this product is more accessible than many but it’s still not Disney’s primary business and leaves a lot to be desired.
* Services like [OpenDNS](http://opendns.com) have been around for a long time and provide a decent way for blocking things like pornography at your network level. They don’t offer a great solution once your mobile device leaves the nest. It’s not great at dealing with tracking and ads, either. And the interface for working with OpenDNS is painfully dated and difficult to use.
* In comes [NextDNS](https://nextdns.io), a competitor to services like OpenDNS that also deals with stopping trackers and blocking ads.
* Spoiler alert: [NextDNS](https://nextdns.io) is awesome.
* [NextDNS](https://nextdns.io) is free for up to 300k DNS requests a month. In my household I blew through this in 12 days, but it’s a great way to grease the gears, and if you happen to be beneath that total request account, then the service is essentially free. There is simply no reason not to try it out.
* [NextDNS](https://nextdns.io) runs a bank-breaking $20/year for your home network and associated devices. This is half a trip to Burger King for my family.
* [NextDNS](https://nextdns.io) provides traditional domain category blocking, so you can shut down requests to porn, gambling and other things.
* [NextDNS](https://nextdns.io) provides a variety of additional security features, such as enforcing Safe Search with search engines like Google and forcing YouTube restricted mode.
* [NextDNS](https://nextdns.io) has advanced security features such as Cryptojacking protection, something that most people have never heard of but on which [NextDNS](https://nextdns.io) has you covered.
* [NextDNS](https://nextdns.io) also include Native Tracking Protection, which stops hardware like my Sonos and Roku from capturing low level tracking data. Apple actually does some of this tracking too (though it’s anonymized when it hits Apple’s servers), but I’ve found that some Apps really choke when it’s enabled. I’m looking at you, Pokemon TCG and Marvel Unlimited.
* I’ve stopped using ad blockers on my devices because [NextDNS](https://nextdns.io) has me covered.
* Using [NextDNS](https://nextdns.io) at the router level, everyone in my family got tracking and ad protection. My kids largely don’t have access to the web because they interact mostly through apps which I have to approve before they can install them. [NextDNS](https://nextdns.io) was an upgrade to our internet security because of how broadly I could apply it to all of my family’s devices.
* My plan is to install the [NextDNS iOS app](https://apps.apple.com/ca/app/nextdns/id1463342498) on each iPhone, iPad and iPod touch in the house. This is a hassle the first time, but it uses a VPN profile to ensure that the device is forced to route through [NextDNS](https://nextdns.io) DNS services when they leave the nest. I can still control [NextDNS](https://nextdns.io) centrally, and the app also allows me to identify each device so that I can see what’s happening from [NextDNS](https://nextdns.io) logs. The setup effort involved here is well worth it in my opinion.
* [NextDNS also has a Mac app](https://apps.apple.com/app/nextdns/id1464122853) that covers the same use case, and it’s installed on the one personal Mac we have in the house. I imagine they have a Windows app, too, for those who use that OS.
* Side Note: [It’s worth taking the time to install the NextDNS root certificate on your devices, too.](https://help.nextdns.io/t/g9hmv0a/how-to-install-and-trust-nextdns-root-ca)
* [NextDNS](https://nextdns.io) has some seriously awesome technology, but they also have awesome explanations of what they do. Take, for example, [this absurdly easy to understand privacy policy](https://nextdns.io/privacy).
* Tangentially related to this is that if you’ve just been using whatever random DNS servers your ISP has configured (whether that’s Comcast, etc. or your cellular provider like Verizon) you’re exposing a lot of data and it’s probably impacting your network performance. Over the years, services like OpenDNS or [Google’s DNS](https://developers.google.com/speed/public-dns/) or [Cloudflare’s 1.1.1.1](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/) have offered faster DNS lookups without all of the additional security protections of NextDNS. Cloudflare actually has a decent mobile setup to cover you when you leave the nest, but otherwise once you went mobile you were on your own. [NextDNS](https://nextdns.io) has you covered on this front and as far as I can tell is competitive with the other big DNS providers. It’s definitively faster than the defaults my AT&T Broadband connection provides.
* For the first time since I gave my kids devices I really feel like our internet is safe. [NextDNS](https://nextdns.io) has thought about things I never considered and is protecting the household at multiple layers.
* If you’re like me and you’re not comfortable with wide open access to the internet for your kids, this is the absolute best thing you can do for them.
* If you’re like me and you’d rather not have every action you take on the internet be tracked, this is the absolute best way to stop that.
* If you’re like me and you’re tired of excessive and inappropriate ads on everything from your news app, to the web, to your Roku, then this is the absolute best way to stop that.
* Seriously, give [NextDNS](https://nextdns.io) a shot. You won’t regret it!

I did not receive anything in return for this review, and none of the links I’m providing to [NextDNS](https://nextdns.io) are affiliate links. I simply believe in the service.

<figure>
{% image "./assets/nextdns-security.jpg", "NextDNS offers several layers of security, many of which are very advanced and mitigate serious risks." %}
<figcaption>NextDNS offers several layers of security, many of which are very advanced and mitigate serious risks.</figcaption>
</figure>

<figure>
{% image "./assets/nextdns-privacy.jpg", "NextDNS ad & tracker blocking is the best I've ever used." %}
<figcaption>NextDNS ad & tracker blocking is the best I've ever used.</figcaption>
</figure>

<figure>
{% image "./assets/nextdns-parental-control.jpg", "NextDNS parental controls let you block entire categories as well as individual sites and services." %}
<figcaption>NextDNS parental controls let you block entire categories as well as individual sites and services.</figcaption>
</figure>

<figure>
{% image "./assets/nextdns-analytics.jpg", "NextDNS analytics give a nice overview of exactly what's happening with your internet traffic." %}
<figcaption>NextDNS analytics give a nice overview of exactly what's happening with your internet traffic.</figcaption>
</figure>

<figure>
{% image "./assets/nextdns-logs.jpg", "NextDNS lets you see the individual requests mit blocks. As you can see my Roku is a bit out of control with the tracker requests." %}
<figcaption>NextDNS lets you see the individual requests mit blocks. As you can see my Roku is a bit out of control with the tracker requests.</figcaption>
</figure>

const n=`---
title: "Why I moved away from the all-in-one privacy stack"
date: "2026-03-17"
excerpt: "I used Proton Unlimited for a while. It looked perfect on paper. Then I started thinking about control, Linux compatibility, and what happens when a single provider holds everything."
readTime: "5 min read"
---

# Why I moved away from the "all-in-one" privacy stack

For a long time I used Proton Unlimited. On paper it looked perfect: email, VPN, drive, password manager, aliases, and more — all in one privacy-focused ecosystem.

Recently I decided to rebalance my setup. I did not leave Proton completely, but I stopped relying on a single provider for everything.

This was not about distrust. It was about **control, Linux compatibility, and flexibility**.

## Linux first

My main system is Linux (Arch), so compatibility matters.

For me, it is important to support companies that **actually take Linux users seriously**, not treat them as an afterthought.

Some services work great. Others still feel like second-class citizens.

Proton Mail works well.
Proton Drive, on the other hand, still lacks proper Linux support and does not fit naturally into a Linux workflow.

That alone makes it hard to rely on long-term.

This was one of the main reasons I downgraded from Proton Unlimited to **Mail Plus**.

## Storage: choosing what actually works

For storage, I use Filen.

I was able to get a **400GB lifetime plan** at a very good price, and more importantly, it has **proper Linux support**.

That makes a big difference. A tool you can actually use daily is always better than one that looks good on paper but does not integrate with your system.

## Avoiding a single point of failure

Another reason for the change is architectural.

Putting everything under one provider is convenient, but it also creates a single point of failure.

If something happens to that account, everything is affected.

Instead, I prefer a distributed setup where each tool can be replaced independently.

## My current stack

Here is the direction I moved toward:

**Email**
Proton Mail (Mail Plus)
→ considering Tutanota in the future for better Linux alignment

**Custom domain**
Own domain for email — this is key
→ allows switching providers without being locked in

**Email aliases**
Addy.io (instead of SimpleLogin)

**Password manager**
KeePass (instead of Proton Pass)

**Authenticator**
Ente Auth

**Photos**
Ente Photos (instead of Google Photos)

**VPN**
NordVPN — included with my Revolut subscription, so it made sense to use it

**Storage**
Filen (400GB lifetime)

## Why the custom domain matters most

One of the most important decisions I made was using my own domain for email.

This changes everything.

It means I can move between providers — Proton, Tutanota, or others — without changing my email address or losing control.

No lock-in.

## Proton is still part of my setup

This is not about abandoning Proton.

Proton Mail is still one of the best privacy-focused email services available, and I continue to use it.

I simply decided that **email is where Proton fits best for me**.

## Final thought

Privacy is not only about encryption.

It is also about **how you design your system**.

For me, the goal is simple:

Use tools that respect my platform (Linux), avoid unnecessary lock-in, and make sure no single company holds everything.
`;export{n as default};

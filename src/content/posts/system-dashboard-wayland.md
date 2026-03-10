---
title: "Building a native Wayland dashboard after cloud sync failed me"
date: "2026-03-10"
excerpt: "How a simple Filen sync check turned into a practical PyQt6 dashboard I use every day."
coverImage: "/images/blog/system-dashboard.png"
readTime: "6 min read"
---

# Building a native Wayland dashboard after cloud sync failed me

I did not start this project because I wanted to build a full monitoring app.
I started it because I wanted to trust that my cloud sync was actually working.

## The problem

I first tried Proton Drive, but Linux support was not reliable enough for my workflow.
I moved back to Filen, which works better on Linux, but I still had random sync stalls on my Arch and Hyprland setup.

The bad part was that failures were silent.
I only noticed when I needed a file on another device.

## The first solution

I wrote a small Python script to check Filen process status and logs.
That solved the main issue, but I still had to open a terminal every time I wanted to verify sync health.

## Why it became a desktop app

Once I had the logic, I wanted it visible all the time.
So I wrapped it in a PyQt6 interface and kept extending it with the metrics I actually care about.

Now the dashboard tracks:

- Filen sync health and daemon status
- CPU, RAM, network I/O, battery, and disk usage
- Systemd services in both system and user scope
- Kernel and journal alerts
- Pending Arch package updates

## What changed for me

The biggest improvement is service visibility.
I can spot failing background services early, before they become a bigger problem.

It is lightweight, always visible, and focused on my own machine instead of trying to be a generic monitoring suite.

## Source

- [System Dashboard on Codeberg](https://codeberg.org/bgonc/system-dashboard)
- [System Dashboard mirror on GitHub](https://github.com/bgonc/system-dashboard)

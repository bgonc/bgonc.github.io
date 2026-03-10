const e=`---
title: "Building a native Wayland dashboard after cloud sync failed me"
date: "2026-03-10"
excerpt: "How a simple Filen sync check turned into a full PyQt6 desktop dashboard for Hyprland."
readTime: "8 min read"
---

# Building a native Wayland dashboard after cloud sync failed me

If you use a custom Linux desktop long enough, you hit a point where off the shelf tools are close, but not quite right. That is exactly how this project started.

I did not wake up planning to build a full desktop dashboard. I just wanted to trust that my files were syncing in the background.

## Where it started

I first tried Proton Drive because I already use their ecosystem. The problem was Linux support. For my workflow, no reliable native sync client means no reliable cloud backup.

So I moved back to Filen. Filen itself is solid, and Linux support is much better, but I had a different issue on Arch with Hyprland. Sync would occasionally stall with no obvious warning. I would only notice when I needed a file on another device.

I ended up checking logs manually too often. That became annoying fast.

## The first fix

The first version was just a Python script. It checked the Filen process and inspected logs so I could quickly see if sync was healthy.

That solved the immediate issue, but I still had to run it in a terminal. It worked, but it was not something I could trust at a glance during normal work.

## Turning it into a real desktop tool

Once I had the script, the next step was obvious: put the important status in a small always visible desktop app.

I used PyQt6 because it runs smoothly in my Wayland setup and gives me full control over the UI. From there, the app grew from one check into a full dashboard.

## What the dashboard tracks now

- Filen sync health and daemon status
- CPU, RAM, network I/O, battery, and disk usage
- Systemd services in both system and user scope
- Kernel alerts from journal logs
- Pending package updates on Arch

The biggest improvement for me is service visibility. I can spot failing background services early instead of finding out later when something already broke.

## Why I still use it every day

This dashboard is not trying to replace every monitoring tool. It is a practical layer that matches my own workstation and workflow.

It sits on my desktop, stays lightweight, and gives me the exact status I care about without noise.

The project started from one sync frustration, but it ended up becoming my daily control panel for the whole machine.

## Source

[system-dashboard on Codeberg](https://codeberg.org/bgonc/system-dashboard)
`;export{e as default};

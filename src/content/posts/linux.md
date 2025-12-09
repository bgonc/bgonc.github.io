---
title: "Testing"
date: "2024-12-04"
excerpt: "Second week of studying for the Red Hat exam. Covering file management and basic commands."
coverImage: "https://picsum.photos/800/400?random=31"
readTime: "3 min read"
---

# RHCSA Week 1

I've started my journey towards the Red Hat Certified System Administrator certification. Here's what I learned this week.

## File Management

Understanding `ls`, `cp`, `mv`, and `rm` is crucial. But Red Hat asks for more. You need to know permissions inside out.

### chmod and chown

To change permissions:

```bash
chmod 755 script.sh
```

To change ownership:

```bash
chown user:group file.txt
```

## Systemd

Managing services is a huge part of the exam.

```bash
systemctl status sshd
systemctl enable --now httpd
```

Next week: User management and LVM!
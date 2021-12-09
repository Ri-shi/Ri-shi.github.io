---
layout: post
title: ABC’s - Deploying Front Ends (featuring EC2)
---

With Cloud infrastructure becoming ultra-available, deploying apps have become super easy and as such the deployment/devops space (in my opinion) is going to get pretty interesting in the next few years (since I believe that trivializing the basics makes a breeding ground for creativity). I wanted to document how I’ve been deploying my side projects (very basic apps, prototypes and POCs) for posterity.

## Step 1: Prep your server

Before you think about deploying your app, you need to configure your server. This means:

1. Getting Nginx or Apache
2. Configuring your ports
3. If deploying multiple apps, configuring a reverse proxy
4. If you have a domain, configuring your DNS and getting SSL certificates for HTTPS

Points 3 and 4 are out of this scope, but I’ll probably write something about those in the future (tbh, I’m too lazy to get into it now).

I prefer to use Nginx, just because it’s so much simpler to configure, and allows you to do the reverse proxy-ing much quicker. So this article will focus more on that rather than apache, which is also a fine tool, don’t get me wrong.

If on ubuntu:

```bash
sudo apt-install nginx
```
If on EC2 (which I often am) go to the `Security Policy` that was configured when you instantiated the server and check out the `Outbound` tab. From here you can configure any port you want for TCP or UDP and there is plenty of docs to get you straight for that.

Your Nginx setup will auto-magically configure your HTTP port for your server (Port 88) and will also use the default folder that is used by Apache 2 by default (more on that later).

## Step 2: Build your project

This obviously depends on what framework you use, but most all modern ones use either Webpack, Rollup or something similar under the hood.

Now all you need to know is that these build tools generate a “bundled” version of your code, which in essence are 1 or 2 files (or a similarly small amount of large files) that contain the entirety of your codebase created in a folder with all your assets (such as images or css and the like). In the case of Typescript projects, this will be compiled down to javascript.

This “bundle” or file is what your server is concerned with. It’s the deployable artefact that needs to be “published”.

For Svelte and React:
```bash
npm run build
```
For Angular 2:
```bash
ng build .
```

## Step 3: Publishing your Artifacts

As the heading suggests, you’re now able to get your app onto the server to be accessible from the public url.

“Publish” in this context (and usually in most situations) just means copying the artefact into a publicly accessible folder, which is the endpoint configured in Apache or Nginx. In linux this is almost always `/var/www/html/*`

The simplest, most basic way to do this (in my opinion) is to just FTP into your server and copy the files. In a production environment ideally you’d use a CI/CD-esque tool like AWS Codestar, GitHub Actions or Azure Devops Pipelines, but when you’re just wanting to deploy a small prototype or POC, §“ain’t nobody got time for that”.

I’ll be using `sftp` from the terminal. You can use something like Filezilla or other GUI ftp apps, but I’m lazy and I also don’t like installing extra apps if there’s a perfectly fine solution out of the box.

If on EC2, change to the directory that contains your `public` files (or whatever your framework generated from the previous step) and:
```bash
sftp -i <path to your pem key file here> ubuntu@<your EC2 public domain here>:/var/www/html/
```

If you're using the Amazon Linux image you can substitute `ubuntu` for `user`. If you don't know how to get your key file, check out the docs on how to connect with SSH. It's basically the same process and the pem file works for most everything to do with connecting remotely to your instance.

Next you want to actually transfer the files:
```bash
put -r public/*
```

Wait for that to complete and then exit `sftp` (usually Ctrl-C or `exit`) and restart nginx for good measure:
```bash
sudo service nginx restart
```

I've found that restarting nginx will invalidate client side caching so that the user doesn't have to hard-refresh the browser if they log on with an active cache.

## Closing Remarks

There you go. You have an admittedly basic but super (and here 'super' means 'relatively') pain free prototype that is publicly accessible (or as accessible as you configure the EC2 security policy to be) and easy to run and update. If you're reading this, hope it helped!
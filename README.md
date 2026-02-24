# CriticalIQ — Complete Setup Guide
### Everything you need to get this live, running, and making money — explained step by step.

---

## What's in this folder?

| File | What it is |
|------|-----------|
| `index.html` | The main public website advisers see |
| `admin.html` | Your private dashboard (signups, revenue, alerts) |
| `README.md` | This guide |

**The concept in one sentence:** You host these two HTML files on the internet, connect Stripe to take payments, and set up a cheap automated system that checks insurer websites every morning and sends alerts to your subscribers when something changes.

---

## Table of Contents

1. [Your domain name](#step-1-buy-your-domain-name)
2. [Put the site live (free hosting)](#step-2-put-the-site-live-for-free)
3. [Connect Google AdSense (optional ad revenue)](#step-3-connect-google-adsense-optional)
4. [Take payments with Stripe](#step-4-take-payments-with-stripe)
5. [Set up subscriber accounts with Memberstack](#step-5-set-up-subscriber-accounts)
6. [The daily policy crawler (the magic bit)](#step-6-the-daily-policy-crawler)
7. [Automated email alerts to subscribers](#step-7-automated-email-alerts)
8. [Keeping it running — monthly checklist](#step-8-keeping-it-running)
9. [Costs breakdown](#costs-breakdown)
10. [If something breaks](#if-something-breaks)

---

## Step 1: Buy Your Domain Name

**What this is:** Your website address — criticaliq.co.uk

**Where to buy it:** Go to [www.namecheap.com](https://www.namecheap.com)

**How to do it, exactly:**

1. Open Safari or Chrome on your Mac
2. Go to **namecheap.com**
3. In the big search box, type `criticaliq.co.uk` and press Enter
4. It will either say "Available ✓" or "Taken ✗"
   - If available: click **Add to Cart**, then **Checkout**
   - If taken: try `criticaliq.co.uk`, `critical-iq.co.uk`, or `criticaliqapp.co.uk`
5. At checkout, create a free Namecheap account with your email
6. Pay — a .co.uk domain costs about **£8–12 per year**
7. Tick **"Auto-renew"** so it never expires without you noticing

**You do not need to do anything else with this yet.** You'll connect it to your hosting in Step 2.

---

## Step 2: Put the Site Live (for Free)

**What this is:** "Hosting" means putting your files on a computer that's always on, so people can visit your website. We'll use **Netlify** — it's free forever for sites like this.

**How to do it, exactly:**

### 2a — Create a Netlify account

1. Go to [app.netlify.com/signup](https://app.netlify.com/signup)
2. Click **"Sign up with Email"**
3. Enter your email and create a password
4. Check your email and click the confirmation link

### 2b — Deploy your site (drag and drop — seriously this easy)

1. Open the **Finder** on your Mac
2. Navigate to: `Macintosh HD → Users → Cal → Documents → criticaliq`
   (This is where you put this folder when you downloaded it)
3. On Netlify, after logging in, you'll see a big grey box that says **"Drag and drop your site folder here"**
4. Drag your entire `criticaliq` folder from Finder into that box
5. Wait about 10 seconds — Netlify will give you a temporary address like `amazing-duck-123.netlify.app`
6. Click it — your site is live! 🎉

### 2c — Connect your domain name

1. In Netlify, go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Type `criticaliq.co.uk` and click **Verify**
4. Netlify will show you some "DNS records" to add — it looks scary but isn't

Now go back to Namecheap:

5. Log in to Namecheap
6. Click **"Domain List"** in the left sidebar
7. Click **"Manage"** next to criticaliq.co.uk
8. Click the **"Advanced DNS"** tab
9. You need to add the records Netlify showed you. They look like this:

   | Type | Host | Value |
   |------|------|-------|
   | A Record | @ | 75.2.60.5 |
   | CNAME | www | your-site-name.netlify.app |

   - Click **"Add New Record"** for each one
   - Select the Type from the dropdown
   - For "Host" type exactly what it says (@ means your main domain)
   - For "Value" paste exactly what Netlify showed you
   - Click the green tick to save each one

10. Go back to Netlify and click **"Verify DNS configuration"**
11. Wait up to 24 hours — usually takes about 1 hour. Then `criticaliq.co.uk` will show your site.

**Free SSL (the padlock):** Netlify does this automatically. Your site will be `https://` with a padlock at no extra cost.

### 2d — How to update the site when you want to make changes

Whenever you edit `index.html` or `admin.html`:

1. In Netlify, go to **Deploys**
2. Drag your updated folder into the deploy box again
3. Done — live in under 30 seconds

---

## Step 3: Connect Google AdSense (Optional)

**What this is:** Google puts adverts on your site and pays you when visitors click them. Insurance-related ads pay very well — typically £1–5 per click. This is completely passive income once set up.

**Important:** Google requires your site to have real content and real visitors before approving you. Apply after you have at least 50 real users visiting the site.

### 3a — Apply for AdSense

1. Go to [adsense.google.com](https://adsense.google.com)
2. Click **"Get started"**
3. Sign in with your Google account (or create one)
4. Enter your website URL: `https://criticaliq.co.uk`
5. Fill in your payment details (bank account — this is how you get paid)
6. Google will review your site — takes 1–14 days
7. You'll receive an email saying you're approved (or what to fix if not)

### 3b — Add your publisher ID to the website

Once approved, Google gives you a **Publisher ID** — it looks like: `ca-pub-1234567890123456`

1. Open `index.html` in TextEdit (right-click → Open With → TextEdit)
2. Press **Cmd+F** to search
3. Search for: `ca-pub-XXXXXXXXXXXXXXXXX`
4. Replace it with your actual publisher ID, e.g.: `ca-pub-1234567890123456`
   (There are 3 places to update — replace all of them)
5. Also find the comment at the very top of the file that starts with `<!-- Google AdSense —` and uncomment it by removing the `<!--` at the start and `-->` at the end
6. Save the file
7. Re-upload to Netlify (drag and drop again)

**Ad slots are already placed** in the HTML — one above the site, one in the providers section, one after the quote engine. Google's system automatically fills them with the highest-paying relevant ads.

---

## Step 4: Take Payments with Stripe

**What this is:** Stripe is the payment processor. When an adviser clicks "Start Free Trial" and enters their card details, Stripe handles all of it securely. You never see card numbers. Stripe deposits money into your bank account on a rolling basis.

### 4a — Create a Stripe account

1. Go to [stripe.com](https://stripe.com)
2. Click **"Start now"**
3. Enter your email and create a password
4. Follow the verification steps — you'll need:
   - Your mobile number (for 2FA security)
   - Your bank account details (so Stripe can pay you)
   - Basic business info (you can register as a sole trader)
5. Complete identity verification (takes a few minutes)

### 4b — Create your two products in Stripe

You need to create the two subscription products:

**Product 1 — Monthly:**
1. In Stripe, go to **Products** in the left menu
2. Click **"Add product"**
3. Name: `CriticalIQ Professional - Monthly`
4. Pricing: Recurring · £19.00 · Monthly
5. Click **Save product**
6. Copy the **Price ID** — it looks like `price_1AbCdEfGhIjK` — paste it somewhere safe (Notes app)

**Product 2 — Annual:**
1. Click **"Add product"** again
2. Name: `CriticalIQ Professional - Annual`
3. Pricing: Recurring · £189.00 · Yearly
4. Click **Save product**
5. Copy the **Price ID**

### 4c — Create payment links (the easy no-code way)

Stripe has a "Payment Links" feature — you create a link, and when someone clicks it they go to a Stripe-hosted checkout page. No coding required.

1. In Stripe, go to **Payment Links**
2. Click **"Create payment link"**
3. Select your Monthly product
4. Under **"After payment"**, set redirect to: `https://criticaliq.co.uk/welcome`
   (We'll create this simple page later, or just redirect to the homepage for now)
5. Copy the payment link — it looks like `https://buy.stripe.com/abc123`

Do the same for the Annual product.

### 4d — Add the payment links to your website

1. Open `index.html` in TextEdit
2. Press **Cmd+F** and search for `Start 7-Day Free Trial`
3. Find the button: `<a href="#" class="btn btn-azure"...>Start 7-Day Free Trial →</a>`
4. Replace the `#` with your monthly Stripe payment link
5. Search for `Start Free — No Card Needed` and update that button to link to your free signup (see Step 5)
6. Save and re-upload to Netlify

**About the free trial:** Stripe supports free trials natively. When creating your payment link, under **"Subscription"** there's a **"Free trial"** option — set it to 7 days. The adviser's card is saved at signup but not charged until day 8.

---

## Step 5: Set Up Subscriber Accounts

**What this is:** You need a way for subscribers to log in and access the Pro features. The simplest no-code way is **Memberstack** — it adds login/signup to your existing HTML with a single copy-paste.

**Cost:** Free up to 100 members, then $25/month — very reasonable.

### 5a — Create a Memberstack account

1. Go to [memberstack.com](https://www.memberstack.com)
2. Click **"Get started for free"**
3. Connect it to your site's URL

### 5b — Create your membership plan in Memberstack

1. In Memberstack dashboard, go to **Plans**
2. Click **"New plan"**
3. Name: `Professional`
4. Connect it to your Stripe price (paste in your Stripe Price ID from Step 4b)
5. Set **Free content** vs **Protected content** — your free 5-comparison view is public; full access is protected

### 5c — Add the login/signup widget

Memberstack gives you a tiny JavaScript snippet to add to your HTML. It looks like:

```html
<script src="https://memberstack.com/static/memberstack.js" data-memberstack-id="YOUR_ID"></script>
```

1. Copy this from your Memberstack dashboard
2. Open `index.html` in TextEdit
3. Find `</head>` near the top of the file
4. Paste the Memberstack script just before `</head>`
5. Save and re-upload

Memberstack will automatically add a login portal to your site. Existing buttons with `data-ms-content` attributes will show/hide based on login status.

---

## Step 6: The Daily Policy Crawler

**What this is:** Every morning, an automated script visits each insurer's policy document page, compares it to yesterday's version, and if anything changed, logs it and triggers an email alert. This is the core engine that keeps your data fresh without you doing anything.

**We'll use GitHub Actions** — it's free (up to 2,000 minutes/month, and this script uses about 5 minutes/day).

### 6a — Create a GitHub account

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Create a free account

### 6b — Create a new repository

Think of a repository as a folder on GitHub that stores your code.

1. In GitHub, click the **+** icon (top right) → **New repository**
2. Name it: `criticaliq-crawler`
3. Set it to **Private** (important — keeps your code private)
4. Tick **"Add a README file"**
5. Click **"Create repository"**

### 6c — Create the crawler script

1. In your repository, click **"Add file"** → **"Create new file"**
2. Name it: `crawler.py`
3. Paste this code:

```python
import requests
import hashlib
import json
import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

# List of provider policy document URLs to monitor
PROVIDERS = {
    "Aviva CIC+": "https://www.aviva.co.uk/retirement/documents/critical-illness-cover-key-facts/",
    "Vitality SIC+": "https://www.vitality.co.uk/insurance/life-insurance/serious-illness-cover/",
    "Royal London": "https://www.royallondon.com/insurance/critical-illness/",
    "Legal & General": "https://www.legalandgeneral.com/insurance/critical-illness-cover/",
    "Guardian 1821": "https://guardianfinancialservices.co.uk/protection/critical-illness/",
    "Scottish Widows": "https://www.scottishwidows.co.uk/protection/critical-illness/",
    "Zurich": "https://www.zurich.co.uk/insurance/life-insurance/critical-illness",
    "LV=": "https://www.lv.com/insurance/life-insurance/critical-illness",
}

HASHES_FILE = "hashes.json"

def get_page_hash(url):
    try:
        response = requests.get(url, timeout=15, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        })
        return hashlib.md5(response.text.encode()).hexdigest()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def load_hashes():
    if os.path.exists(HASHES_FILE):
        with open(HASHES_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_hashes(hashes):
    with open(HASHES_FILE, 'w') as f:
        json.dump(hashes, f, indent=2)

def send_alert(changes):
    # Uses environment variables set in GitHub (see Step 6e)
    sender = os.environ.get('ALERT_EMAIL_FROM')
    password = os.environ.get('ALERT_EMAIL_PASSWORD')
    
    subject = f"CriticalIQ Alert: {len(changes)} policy page(s) changed"
    body = f"""
CriticalIQ Daily Policy Monitor
{datetime.now().strftime('%A %d %B %Y, %H:%M')}

The following provider pages appear to have changed:

{chr(10).join(f'• {name}: {url}' for name, url in changes)}

Please review these pages manually and update the conditions database if needed.
Then log any changes in the Daily Update Log on the website.

---
CriticalIQ Policy Monitor
    """
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = sender  # sends to yourself — change to subscriber list later
    
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender, password)
        server.sendmail(sender, [sender], msg.as_string())
        server.quit()
        print(f"Alert sent for {len(changes)} changes")
    except Exception as e:
        print(f"Failed to send email: {e}")

def main():
    print(f"Starting crawler at {datetime.now()}")
    old_hashes = load_hashes()
    new_hashes = {}
    changes = []
    
    for name, url in PROVIDERS.items():
        print(f"Checking {name}...")
        current_hash = get_page_hash(url)
        if current_hash is None:
            continue
        new_hashes[name] = current_hash
        
        if name in old_hashes and old_hashes[name] != current_hash:
            print(f"  ⚠️  CHANGE DETECTED: {name}")
            changes.append((name, url))
        else:
            print(f"  ✓ No change: {name}")
    
    save_hashes(new_hashes)
    
    if changes:
        print(f"\n{len(changes)} change(s) detected — sending alert email...")
        send_alert(changes)
    else:
        print("\nNo changes detected today.")

if __name__ == "__main__":
    main()
```

4. Click **"Commit new file"** (green button at the bottom)

### 6d — Create the automation schedule

1. In your repository, click **"Add file"** → **"Create new file"**
2. Name it exactly: `.github/workflows/daily-crawl.yml`
   (GitHub automatically creates the folders from the path)
3. Paste this:

```yaml
name: Daily Policy Crawler

on:
  schedule:
    # Runs at 6:00 AM UTC every day (6am UK time in winter, 7am BST in summer)
    - cron: '0 6 * * *'
  workflow_dispatch:  # Allows you to run it manually too

jobs:
  crawl:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: pip install requests
    
    - name: Run crawler
      env:
        ALERT_EMAIL_FROM: ${{ secrets.ALERT_EMAIL_FROM }}
        ALERT_EMAIL_PASSWORD: ${{ secrets.ALERT_EMAIL_PASSWORD }}
      run: python crawler.py
    
    - name: Save updated hashes
      run: |
        git config user.name "CriticalIQ Bot"
        git config user.email "bot@criticaliq.co.uk"
        git add hashes.json
        git diff --staged --quiet || git commit -m "Daily hash update $(date +'%Y-%m-%d')"
        git push
```

4. Click **"Commit new file"**

### 6e — Add your email credentials (securely)

You need to give GitHub your email details so the script can send alerts. We do this via "Secrets" — they're encrypted and never visible.

**First, set up a Gmail App Password:**

1. Go to your Google Account settings: [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Under "How you sign in to Google", click **2-Step Verification** (enable it if not already on)
4. Scroll to the bottom — click **"App passwords"**
5. Select app: **Mail** | Select device: **Other** → type "CriticalIQ"
6. Click **Generate** — you get a 16-character password like `abcd efgh ijkl mnop`
7. Copy it — you'll only see it once

**Now add the secrets to GitHub:**

1. In your GitHub repository, click **Settings** (top menu)
2. Click **Secrets and variables** → **Actions** (left sidebar)
3. Click **"New repository secret"**

Add these two secrets:

| Secret name | Value |
|-------------|-------|
| `ALERT_EMAIL_FROM` | your Gmail address e.g. `cal@gmail.com` |
| `ALERT_EMAIL_PASSWORD` | the 16-char App Password from above |

4. Click **"Add secret"** for each one

### 6f — Test it works

1. In your repository, click the **Actions** tab
2. Click **"Daily Policy Crawler"** in the left list
3. Click **"Run workflow"** → **"Run workflow"** (green button)
4. Watch it run — click on the running job to see the log
5. You should see it checking each provider and saving the hashes
6. After the first run, you'll have a `hashes.json` file in your repository

From now on, **it runs itself every morning at 6am** and only emails you if something has changed.

---

## Step 7: Automated Email Alerts to Subscribers

**What this is:** When a policy change is detected, you want to email your Pro subscribers. The cleanest free way to do this is **Mailgun** — 1,000 free emails per month (more than enough to start).

### 7a — Create a Mailgun account

1. Go to [mailgun.com](https://www.mailgun.com)
2. Click **"Sign Up"** — free account
3. Verify your email address
4. In the dashboard, go to **Sending → Domains**
5. Click **"Add new domain"**
6. Enter: `mg.criticaliq.co.uk` (this is a subdomain for sending mail)
7. Mailgun will give you DNS records to add — go back to Namecheap and add them the same way as in Step 2c
8. Once verified, go to **API Keys** and copy your **Private API Key**

### 7b — Create your subscriber mailing list

For the early stage (under 100 subscribers), the simplest approach is:

1. Keep a simple spreadsheet of subscriber emails in **Google Sheets**
2. When someone subscribes via Stripe, you get an email notification — add their email to your sheet manually
3. When the crawler detects a change, update the `send_alert` function in `crawler.py` to loop through your subscriber list

For scale (100+ subscribers), use Mailgun's built-in mailing lists:
1. In Mailgun, go to **Lists**
2. Create a list: `subscribers@mg.criticaliq.co.uk`
3. Add subscribers via the API or manually

The crawler script already handles the email sending — you just need to point it at your subscriber list instead of yourself once you're ready.

---

## Step 8: Keeping It Running

**Realistically, your monthly effort should be about 15–30 minutes.**

### What happens automatically (zero effort):
- ✅ Crawler runs every morning at 6am
- ✅ Stripe bills subscribers monthly/annually
- ✅ Stripe sends receipt emails to subscribers
- ✅ Stripe retries failed payments
- ✅ AdSense serves ads and tracks revenue

### What you check once a week (5–10 minutes):
1. **Your email** — any crawler alerts? If yes, visit the flagged provider's site, read what changed, and manually update the relevant provider card and Daily Update Log in `index.html`
2. **Stripe dashboard** — any new signups or cancellations? Any payment failures?
3. **Netlify** — site still live? (You'll get an email if it goes down)

### Monthly checklist (15–20 minutes):
1. Log in to Stripe — check your MRR and payouts
2. Log in to GitHub → Actions — confirm all 30 daily runs succeeded
3. Log in to Netlify — confirm site is live
4. Log in to AdSense (if active) — check revenue
5. Update the auto-status bar date in `index.html` if needed (search for `lastSync`)
6. Add any manual market news to the ticker strip (search for `ticker-inner` in `index.html`)

### When a provider changes something (15–30 minutes, only when needed):
1. Read the crawler alert email
2. Visit the provider's site and read the actual change
3. Open `index.html` in TextEdit
4. Find the relevant provider card (search for the provider name)
5. Update the feature tags — add an orange `ftag h` tag saying `NEW: [what changed]`
6. Add an entry to the Daily Update Log section (search for `log-list`)
7. Update the ticker strip with the news item
8. Save and re-upload to Netlify

---

## Costs Breakdown

Here's exactly what this costs to run at each stage:

### At launch (0–100 subscribers): ~£15–20/month total

| Service | Cost | What it does |
|---------|------|--------------|
| Domain (criticaliq.co.uk) | £10/yr = ~£1/mo | Your web address |
| Netlify hosting | **Free** | Hosts your website |
| GitHub | **Free** | Runs the daily crawler |
| Stripe | 1.5% + 20p per transaction | Takes payments — only costs money when you earn money |
| Memberstack | **Free** (up to 100 members) | Subscriber login |
| Mailgun | **Free** (up to 1,000 emails/mo) | Email alerts |
| AdSense | **Free** (they pay you!) | Ad revenue |

**Monthly fixed cost: ~£1**. Everything else is usage-based or free.

### At growth (100–500 subscribers): ~£30–50/month

| Service | Cost |
|---------|------|
| Domain | £1/mo |
| Netlify | **Free** (or £9/mo Pro if you need forms) |
| GitHub | **Free** |
| Stripe | ~1.5% of revenue (automatic) |
| Memberstack | $25/mo (~£20) |
| Mailgun | ~$0–10/mo depending on email volume |

### Revenue vs costs at 100 subscribers:
- Revenue: 100 × £19 = **£1,900/month**
- Costs: ~£50/month
- Stripe fees: ~£30/month
- **Net: ~£1,820/month profit** 

---

## Connecting Everything: The Signup Flow

Here's how it all works when an adviser signs up:

```
Adviser clicks "Free Trial" 
    → Stripe checkout page 
    → Card saved, 7-day free trial starts
    → Stripe sends welcome email automatically
    → Memberstack creates their login account
    → Adviser logs in and gets full Pro access
    → On day 8, Stripe charges their card £19
    → Each month, Stripe charges automatically
    → If card fails, Stripe retries 3 times then cancels
```

You don't need to do anything in this flow. It's all automatic.

---

## If Something Breaks

### "The site is down"
1. Log in to Netlify
2. Go to Deploys — is the latest deploy green or red?
3. If red, re-drag your folder to deploy again
4. If it's Netlify's issue, check [netlifystatus.com](https://www.netlifystatus.com)

### "The crawler hasn't run"
1. Log in to GitHub
2. Go to your repository → Actions tab
3. Look for any failed runs (red ✗)
4. Click on the failed run to see the error message
5. Most common issue: email password expired — regenerate your Gmail App Password and update the GitHub Secret

### "Stripe isn't taking payments"
1. Log in to Stripe
2. Check **Developers → Logs** for any errors
3. Make sure you're in "Live mode" not "Test mode" (toggle top left)

### "A subscriber can't log in"
1. Log in to Memberstack
2. Go to **Members** and find their email
3. You can manually reset their password or re-send the login email from there

### "I want to add a new provider"
1. Open `index.html` in TextEdit
2. Find the `providers-grid` div (search for it)
3. Copy one of the existing `pcard` divs
4. Change the name, stats, and tags
5. Add the new provider's URL to `crawler.py` in the `PROVIDERS` dictionary
6. Save and re-upload to Netlify, and push the updated `crawler.py` to GitHub

---

## Quick Reference: Where to Log In

| Service | Login URL |
|---------|-----------|
| Your website | netlify.com → Sites |
| Payments | dashboard.stripe.com |
| Subscriber accounts | app.memberstack.com |
| Daily crawler | github.com |
| Email alerts | app.mailgun.com |
| Domain | namecheap.com |
| Ad revenue | adsense.google.com |
| Admin dashboard | criticaliq.co.uk/admin.html |

> **Security note:** Your `admin.html` file is currently public — anyone who knows the URL can see it. Before you go live, either password-protect it through Netlify (Site settings → Access control → Password protection) or move it somewhere private. Free on Netlify's paid plan; otherwise use a simple Netlify form with a password gate.

---

## That's It

You now have:
- ✅ A professional comparison platform live on the web
- ✅ Automated daily monitoring of 20+ insurer policy pages
- ✅ Email alerts when definitions change
- ✅ Stripe handling all payments and billing
- ✅ A subscriber login system
- ✅ An admin dashboard to see your metrics

**Total time to set up: 2–4 hours** (most of that is waiting for DNS to propagate)  
**Time to maintain ongoing: 15–30 minutes per month**

Good luck — questions, email the support docs you set up in Step 7. 👍

---
layout: default
title: Home
description: A small corner of the internet for writing, experiments, and selected work.
---

<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <h1 class="hero-wordmark" aria-label="Mante">
<span aria-hidden="true">███╗   ███╗ █████╗ ███╗   ██╗████████╗███████╗
████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
██╔████╔██║███████║██╔██╗ ██║   ██║   █████╗
██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██╔══╝
██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝</span>
      </h1>
      <p class="hero-text">
        One step further.
        One hour longer.
        One thought deeper.
      </p>
      <p class="hero-subtext">
        Design, systems, and building things.
      </p>
    </div>

    <div class="hero-image-wrap">
      <img src="{{ '/images/pup.jpeg' | relative_url }}" alt="Mante" class="hero-image">
    </div>
  </div>
</section>

<section class="section">
  <div class="section-heading">
    <h2>Latest writing</h2>
    <a href="{{ '/writing/' | relative_url }}">View all →</a>
  </div>

  <ul class="post-list">
    {% for post in site.posts limit: 5 %}
      <li class="post-card">
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%B %-d, %Y" }}
          </time>
          {% if post.tags and post.tags.size > 0 %}
            · {{ post.tags | join: ", " }}
          {% endif %}
        </p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
      </li>
    {% endfor %}
  </ul>
</section>

<section class="section">
  <div class="section-heading">
    <h2>Selected projects</h2>
    <a href="{{ '/projects/' | relative_url }}">See more →</a>
  </div>

  <div class="project-list">
    <div class="project-card">
      <h3>zemaityte.lt</h3>
      <p>A personal website built as a calm publishing surface for essays, experiments, and notes.</p>
    </div>

    <div class="project-card">
      <h3>Design notes</h3>
      <p>Short-form thoughts on typography, layout, visual systems, and digital aesthetics.</p>
    </div>
  </div>
</section>

<section class="section">
  <h2>About</h2>
  <p>
    This is a small corner of the internet for writing, documenting projects, and sharing things in progress.
  </p>
</section>

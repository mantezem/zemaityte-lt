---
layout: default
title: Home
description: Always leave an empty line at the end of file.
---

<section class="hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <h1 class="hero-wordmark" aria-label="Mante">
<span aria-hidden="true">                                         ██╗
███╗   ███╗ █████╗ ███╗   ██╗████████╗███████╗
████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
██╔████╔██║███████║██╔██╗ ██║   ██║   █████╗
██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██╔══╝
██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝</span>
      </h1>
      <p class="hero-text">
        Think one thought deeper.
      </p>
      <p class="hero-subtext">
        Always leave an empty line at the end of file.
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
        <p>{{ post.description }}</p>
      </li>
    {% endfor %}
  </ul>
</section>

[//]: # (<section class="section">)

[//]: # (  <div class="section-heading">)

[//]: # (    <h2>Selected projects</h2>)

[//]: # (    <a href="{{ '/projects/' | relative_url }}">See more →</a>)

[//]: # (  </div>)

[//]: # ()
[//]: # (  <div class="project-list">)

[//]: # (    {% for project in site.data.projects %})

[//]: # (      {% if project.featured %})

[//]: # (        <div class="project-card">)

[//]: # (          <h3>{{ project.title }}</h3>)

[//]: # (          <p>{{ project.description }}</p>)

[//]: # (        </div>)

[//]: # (      {% endif %})

[//]: # (    {% endfor %})

[//]: # (  </div>)

[//]: # (</section>)

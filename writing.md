---
layout: page
title: Writing
permalink: /writing/
description: Essays, notes, and short observations.
---

<ul class="post-list">
  {% for post in site.posts %}
    <li class="post-card">
      <p class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %-d, %Y" }}
        </time>
        {% if post.tags and post.tags.size > 0 %}
          · {{ post.tags | join: ", " }}
        {% endif %}
      </p>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.description | strip_html | truncate: 220 }}</p>
    </li>
  {% endfor %}
</ul>

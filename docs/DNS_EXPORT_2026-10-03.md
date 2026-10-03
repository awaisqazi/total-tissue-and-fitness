# DNS export: totaltissueandfitness.com (pre-cutover)

Captured 2026-10-03 from the GoDaddy DNS Records panel before any GitHub Pages cutover. Use this to restore Webflow hosting if the cutover is rolled back. Registrar and nameservers: GoDaddy (`ns77/ns78.domaincontrol.com`). Domain registered 2024-04-18, expires 2027-04-18.

| Type  | Name                | Data                                                                 | TTL    |
| ----- | ------------------- | -------------------------------------------------------------------- | ------ |
| A     | @                   | 198.202.211.1 (Webflow)                                              | 1 Hour |
| NS    | @                   | ns77.domaincontrol.com.                                              | 1 Hour |
| NS    | @                   | ns78.domaincontrol.com.                                              | 1 Hour |
| CNAME | pay                 | paylinks.commerce.godaddy.com.                                       | 1 Hour |
| CNAME | www                 | cdn.webflow.com. (Webflow)                                           | 1 Hour |
| CNAME | _domainconnect      | _domainconnect.gd.domaincontrol.com.                                 | 1 Hour |
| SOA   | @                   | Primary nameserver: ns77.domaincontrol.com.                          | 1 Hour |
| MX    | @                   | aspmx.l.google.com. (Priority 1)                                     | 1 Hour |
| MX    | @                   | alt1.aspmx.l.google.com. (Priority 5)                                | 1 Hour |
| MX    | @                   | alt2.aspmx.l.google.com. (Priority 5)                                | 1 Hour |
| MX    | @                   | alt3.aspmx.l.google.com. (Priority 10)                               | 1 Hour |
| MX    | @                   | alt4.aspmx.l.google.com. (Priority 10)                               | 1 Hour |
| TXT   | @                   | google-site-verification=HEySbmrZGmORK-zBfRLYcBMKI-kahzmQchw4dJoaiEc | 1 Hour |
| TXT   | @                   | v=spf1 include:dc-aa8e722993._spfm.totaltissueandfitness.com ~all    | 1 Hour |
| TXT   | dc-aa8e722993._spfm | v=spf1 include:_spf.google.com ~all                                  | 1 Hour |
| TXT   | _webflow            | one-time-verification=c340aae3-c31c-429e-8faf-264ef4139368           | 1 Hour |

Only the two Webflow records (A `@` and CNAME `www`) change at cutover. MX, SPF, Google verification, `pay`, and `_domainconnect` must stay as they are.

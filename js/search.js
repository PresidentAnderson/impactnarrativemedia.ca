/* ============================================
   IMPACT NARRATIVE MEDIA - Client-Side Search
   ============================================ */

(function() {
  'use strict';

  // --- Search Index ---
  var SEARCH_INDEX = [
    {
      title: 'Home - Impact Narrative Media',
      url: '/',
      description: 'Fearless independent journalism for Canadians. Deep investigations, trauma-aware reporting, and elevating the voices that matter most.',
      content: 'breaking news housing affordability corporate landlords eviction families healthcare rural doctors environment indigenous water drinking water labour gig workers delivery economy injuries wage theft justice bail system pretrial detention indigenous black canadians foster care youth disability benefits canada disability benefit refugee women catering empire winnipeg community board classifieds real estate listings newsletter daily brief subscribe',
      section: 'News'
    },
    {
      title: 'Investigations',
      url: '/investigations.html',
      description: 'Deep investigative journalism exposing systemic injustice across Canada. Trauma-aware, evidence-based, community-centred reporting.',
      content: 'invisible eviction corporate landlords displacing families renovictions rent increases housing crisis rural healthcare collapse doctors saskatchewan northern ontario poisoned waters first nations drinking water advisories bail system broken pretrial detention race indigenous black migrant worker trap employer tied permits philippines mexico guatemala foster care aging out youth independence labour expose children accountability journalism securedrop signal encrypted tips sources whistleblower',
      section: 'Investigations'
    },
    {
      title: 'Real Estate',
      url: '/realestate.html',
      description: 'Explore Canadian real estate listings with immersive virtual tours. Experience properties from your chair before you visit in person.',
      content: 'property listings virtual tour immersive walkthrough halifax heritage home montreal mile end exposed brick west vancouver ocean view mid-century modern lake of the woods cottage kenora fredericton bungalow winnipeg exchange district condo calgary ranchlands modern family neighbourhood walkability transit score bike score green space photos gallery search location price beds baths square feet buy sell house apartment farm acreage commercial',
      section: 'Real Estate'
    },
    {
      title: 'Classifieds & Community Board',
      url: '/classifieds.html',
      description: 'Community classifieds, bulletin board ads, and local listings. The community board Canadians have been missing since the days of paper classifieds.',
      content: 'for sale services housing community jobs wanted events pets free stuff cedar canoe vintage woodstove greenhouse tax clinic newcomers elder home repair trauma informed yoga cooperative house roommate accessible seed library storytelling circle community fridge social worker harm reduction investigative journalist wheelchair van accordion teacher tenant rights workshop pow wow senior dog moving piano post ad bulletin board classifieds',
      section: 'Community'
    },
    {
      title: 'About Impact Narrative Media',
      url: '/about.html',
      description: 'Our mission: fearless, trauma-aware journalism that elevates the voices of the voiceless across Canada.',
      content: 'mission values elevate voiceless trauma aware reporting deep not fast independent accountable community rooted controversial team amara okafor editor in chief james makokis indigenous affairs priya sharma health social policy maria chen labour immigration kwame asante justice data fatima al-hassan community voices editorial standards funding subscriptions advertising special projects contact ethics policy awards national newspaper award michener citation',
      section: 'About'
    },
    {
      title: 'Subscribe',
      url: '/subscribe.html',
      description: 'Support independent Canadian journalism. Subscribe to Impact Narrative Media and help fund investigations that hold power accountable.',
      content: 'membership plans reader supporter champion free newsletter articles investigations archives ad-free experience deep dive weekly comments early access classifieds quarterly editorial briefing gift subscription fund a story vote pricing monthly subscription independent journalism support donate contribute become member',
      section: 'Services'
    },
    {
      title: 'Community - Letters, Obituaries & Neighbours',
      url: '/community.html',
      description: 'The heartbeat of our community. Letters to the editor, obituaries and celebrations, and profiles of extraordinary ordinary Canadians.',
      content: 'neighbours weekly profile peggy flett churchill manitoba grocery store tony dufresne library bus shelter baba olena ukrainian vegreville alberta teenager accessibility barriers wheelchair fredericton letters to the editor renoviction hamilton rural healthcare new brunswick disability media coverage obituaries robert bobby sinclair cree elder winnipeg dr amina youssef halifax physician thomas macpherson cape breton fisherman fiddler celebrations birthday anniversary graduation baby write letter submit',
      section: 'Community'
    },
    {
      title: 'Culture - Books, Recipes, Comics',
      url: '/culture.html',
      description: 'Canadian culture: monthly book club, community recipes, editorial cartoons, and serial comics. Feed your mind and your belly.',
      content: 'editorial cartoon mira santos housing ladder book club moon of the crusted snow waubgeshig rice indigenous sovereignty climate crisis seven fallen feathers tanya talaga brother david chariandy the skin were in desmond cole community kitchen recipes bannock indigenous food syrian lentil soup shorbat adas nova scotia hodge podge perogies baba ukrainian lumpia shanghai filipino tourtiere quebec comics funny pages north of normal two spirit road illustrated serial cooking food culture arts',
      section: 'Culture'
    },
    {
      title: 'Job Board',
      url: '/jobs.html',
      description: 'Jobs at non-profits, social enterprises, and community organizations across Canada. Find meaningful work.',
      content: 'investigative journalist social worker harm reduction water quality coordinator housing support program coordinator staff lawyer tenant rights youth program facilitator nurse practitioner primary care settlement worker arabic tigrinya non-profit social enterprise indigenous organization community group meaningful work employment career hiring post job remote full-time part-time salary benefits healthcare legal education journalism admin',
      section: 'Services'
    },
    {
      title: 'Daily Crossword',
      url: '/crossword.html',
      description: 'The Impact Narrative daily crossword puzzle. Canadian-themed, progressively challenging through the week.',
      content: 'crossword puzzle games daily canadian themed monday easy friday hard clues across down grid print check reveal archive nadia whitehorse coast to coast hockey quebec igloo maple loonie beaver ottawa niagara rockies yukon basketball',
      section: 'Games'
    },
    {
      title: 'Daily Quiz',
      url: '/quiz.html',
      description: 'Test your knowledge of Canada with our daily quiz. Current events, history, civics, and geography.',
      content: 'quiz questions answers trivia canadian knowledge current events history civics geography drinking water advisories housing affordability british columbia suicide crisis helpline temporary foreign workers home ownership poll of the week right to housing numbers statistics data rent food insecurity er wait time',
      section: 'Games'
    },
    {
      title: 'Community Calendar',
      url: '/calendar.html',
      description: 'Community events across Canada. Workshops, pow wows, town halls, mutual aid, cultural celebrations and more.',
      content: 'events calendar community fridge volunteer montreal heritage seed library vancouver housing justice town hall toronto tenant rights workshop parkdale library storytelling circle saskatoon elders pow wow six nations naloxone training halifax overdose harm reduction newcomer welcome picnic winnipeg free tax clinic riverdale hub activism advocacy culture arts workshops education health wellness submit event province filter',
      section: 'Community'
    },
    {
      title: 'Know Your Rights',
      url: '/rights.html',
      description: 'Practical legal rights information for Canadians. Tenant rights, worker rights, immigration, disability, police interactions and more.',
      content: 'tenant rights eviction rent increases repairs discrimination renoviction worker rights wages safety termination gig work migrant worker protections immigration status work permits refugee claims family reunification deportation defense disability rights accessibility benefits accommodations human rights complaints police justice stops searches arrest bail complaints youth students foster care aging out criminal justice legal aid legal clinic know your rights guide plain language law province',
      section: 'Services'
    },
    {
      title: 'Resource Directory',
      url: '/resources.html',
      description: 'Find help across Canada: food banks, legal aid, shelters, crisis lines, mental health, immigration services and more.',
      content: 'crisis support kids help phone food banks canada shelter safe women children emergency community legal clinics bounceback mental health cbt anxiety depression immigration refugee board helpline hope for wellness indigenous counselling covenant house youth homeless 911 988 suicide 211 community services residential schools trans lifeline domestic violence province directory find help resources essentials housing legal aid mental health disability',
      section: 'Services'
    },
    {
      title: 'Submit Your Story',
      url: '/submit.html',
      description: 'Your story matters. Submit your experience, pitch an investigation, or contribute as a writer to Impact Narrative Media.',
      content: 'share your experience submit story writer journalist pitch investigation first person narrative opinion analysis community reporting photo essay data journalism housing healthcare indigenous rights environment climate justice policing labour workplace immigration disability children youth education corporate accountability confidential anonymous pseudonym trauma informed securedrop signal encrypted email source protection consent',
      section: 'Services'
    },
    {
      title: 'Advertise With Us',
      url: '/advertise.html',
      description: 'Reach engaged, community-minded Canadians. Display ads, bulletin board classifieds, real estate listings, job postings, and event sponsorships.',
      content: 'advertising display banner bulletin board classifieds newsletter sponsor real estate listing job posting event sponsorship custom campaign audience readers monthly subscribers open rate time on page educated engaged community minded ethical no tracking no programmatic pricing packages non-profit discount multi-month annual faq editorial independence',
      section: 'Services'
    },
    {
      title: 'Weather',
      url: '/weather.html',
      description: 'Canadian weather forecasts, regional conditions, advisories, and community weather reports. Weather impacts on vulnerable communities.',
      content: 'weather forecast temperature conditions advisory warning storm cold heat flood rain snow wind british columbia prairies ontario quebec atlantic north emergency preparedness vulnerable communities unhoused elderly disability climate extreme regional forecast community reports',
      section: 'Community'
    },
    {
      title: 'Obituaries & Celebrations of Life',
      url: '/obituaries.html',
      description: 'Honouring the lives of Canadians. Obituaries, tributes, and celebrations of life from communities across the country.',
      content: 'obituary obituaries tribute celebration life memorial remembrance death grief bereavement support indigenous elder community leader activist teacher fisherman grandmother diverse canadians submit tribute photo honour legacy',
      section: 'Community'
    },
    {
      title: 'Letters to the Editor',
      url: '/letters.html',
      description: 'Reader voices on the issues that matter most. Letters to the editor from Canadians across the country.',
      content: 'letters editor reader voices opinion response housing crisis healthcare access indigenous rights climate action education funding rural broadband immigration policy disability rights submit letter editorial guidelines perspectives discourse community',
      section: 'Community'
    },
    {
      title: 'Podcast & Video Hub',
      url: '/media.html',
      description: 'Stories that demand to be heard. The Voiceless investigative podcast, Impact Films documentaries, and community audio stories.',
      content: 'podcast video documentary film audio stories the voiceless investigative behind investigation apple podcasts spotify youtube episode series companion content community voices submit audio short film listen watch stream subscribe follow',
      section: 'Media'
    },
    {
      title: 'The Invisible Eviction: Corporate Landlords Displacing 40,000 Families',
      url: '/articles/invisible-eviction',
      description: 'A six-month investigation reveals the systematic tactics used to push low-income tenants out of affordable housing across five provinces.',
      content: 'invisible eviction corporate landlords housing crisis renovictions rent increases affordable housing displacement tenants families hamilton vancouver montreal amara okafor investigation housing financialization inequality tenant unions legal challenge ontario ruling',
      section: 'Articles'
    },
    {
      title: 'Poisoned Waters: First Nations Drinking Water Crisis',
      url: '/articles/poisoned-waters',
      description: 'First Nations communities still waiting for clean drinking water after 30 years of federal promises.',
      content: 'poisoned waters first nations drinking water advisories neskantaga shoal lake grassy narrows indigenous health federal government accountability water sovereignty james makokis clean water boil advisory contamination infrastructure',
      section: 'Articles'
    },
    {
      title: 'Gig Workers Speak Out: Hidden Injuries Behind Delivery Economy',
      url: '/articles/gig-workers-speak-out',
      description: 'Twelve delivery drivers share their experiences with injuries, wage theft, and the fight for workplace protections.',
      content: 'gig workers delivery drivers injuries wage theft algorithm workplace protections benefits sick leave labour rights gig workers united maria chen delivery economy platform workers rights act',
      section: 'Articles'
    },
    {
      title: 'Contact Us',
      url: '/contact.html',
      description: 'Get in touch with Impact Narrative Media. Editorial inquiries, advertising, tips, and feedback.',
      content: 'contact email phone editorial advertising tips feedback securedrop signal confidential office toronto john street departments community technical',
      section: 'About'
    },
    {
      title: 'Privacy Policy',
      url: '/privacy.html',
      description: 'How Impact Narrative Media collects, uses, and protects your personal information. PIPEDA compliant.',
      content: 'privacy policy data collection cookies analytics personal information PIPEDA compliance retention deletion third party services',
      section: 'Legal'
    }
  ];

  // --- Search Engine ---

  function normalizeText(text) {
    return (text || '').toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function searchIndex(query) {
    if (!query || !query.trim()) return [];

    var normalizedQuery = normalizeText(query);
    var words = normalizedQuery.split(' ').filter(function(w) { return w.length > 1; });

    if (words.length === 0) return [];

    var results = [];

    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var entry = SEARCH_INDEX[i];
      var titleNorm = normalizeText(entry.title);
      var descNorm = normalizeText(entry.description);
      var contentNorm = normalizeText(entry.content);
      var score = 0;

      for (var j = 0; j < words.length; j++) {
        var word = words[j];
        // Title matches weighted 3x
        if (titleNorm.indexOf(word) !== -1) {
          score += 3;
        }
        // Description matches weighted 2x
        if (descNorm.indexOf(word) !== -1) {
          score += 2;
        }
        // Content matches weighted 1x
        if (contentNorm.indexOf(word) !== -1) {
          score += 1;
        }
      }

      if (score > 0) {
        results.push({
          entry: entry,
          score: score
        });
      }
    }

    // Sort by score descending
    results.sort(function(a, b) { return b.score - a.score; });

    return results;
  }

  function highlightText(text, words) {
    if (!words || words.length === 0) return escapeHtml(text);
    var escaped = escapeHtml(text);
    for (var i = 0; i < words.length; i++) {
      if (words[i].length < 2) continue;
      var regex = new RegExp('(' + escapeRegex(words[i]) + ')', 'gi');
      escaped = escaped.replace(regex, '<span class="search-highlight">$1</span>');
    }
    return escaped;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getExcerpt(entry, words) {
    // Build an excerpt from description + some content
    var text = entry.description;
    if (text.length < 120 && entry.content) {
      text += ' ' + entry.content.substring(0, 200);
    }
    // Truncate to ~200 chars
    if (text.length > 200) {
      text = text.substring(0, 200).replace(/\s\S*$/, '') + '...';
    }
    return highlightText(text, words);
  }

  function renderResults(results, query) {
    var container = document.getElementById('search-results');
    var noResults = document.getElementById('no-results');
    var tips = document.getElementById('search-tips');

    if (!container) return;

    var words = normalizeText(query).split(' ').filter(function(w) { return w.length > 1; });

    if (results.length === 0) {
      container.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      if (tips) tips.style.display = 'none';
      return;
    }

    if (noResults) noResults.style.display = 'none';
    if (tips) tips.style.display = 'none';

    var html = '<div class="search-results-header">' +
      '<p style="font-size:0.92rem;color:var(--grey);margin-bottom:var(--space-xl);">' +
      'Found <strong>' + results.length + '</strong> result' + (results.length !== 1 ? 's' : '') +
      ' for "<strong>' + escapeHtml(query) + '</strong>"</p></div>';

    html += '<div class="search-results-grid">';

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var entry = r.entry;
      html += '<a href="' + escapeHtml(entry.url) + '" class="search-result-card">' +
        '<div class="search-result-section">' + escapeHtml(entry.section) + '</div>' +
        '<h3 class="search-result-title">' + highlightText(entry.title, words) + '</h3>' +
        '<p class="search-result-excerpt">' + getExcerpt(entry, words) + '</p>' +
        '<span class="search-result-url">' + escapeHtml(entry.url) + '</span>' +
        '</a>';
    }

    html += '</div>';
    container.innerHTML = html;
  }

  // --- URL & Form Integration ---

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
  }

  function updateURL(query) {
    if (window.history && window.history.replaceState) {
      var url = window.location.pathname;
      if (query) {
        url += '?q=' + encodeURIComponent(query);
      }
      window.history.replaceState(null, '', url);
    }
  }

  function performSearch(query) {
    var input = document.getElementById('search-input');
    var tips = document.getElementById('search-tips');
    var noResults = document.getElementById('no-results');
    var container = document.getElementById('search-results');

    if (input) input.value = query;

    if (!query || !query.trim()) {
      if (container) container.innerHTML = '';
      if (noResults) noResults.style.display = 'none';
      if (tips) tips.style.display = '';
      return;
    }

    updateURL(query);

    var results = searchIndex(query);
    renderResults(results, query);
  }

  // --- Initialize ---

  function init() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');

    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var query = input ? input.value.trim() : '';
        performSearch(query);
      });
    }

    // Check for query param on load
    var initialQuery = getQueryParam('q');
    if (initialQuery) {
      performSearch(initialQuery);
    }

    // Focus input on load if no query
    if (input && !initialQuery) {
      input.focus();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

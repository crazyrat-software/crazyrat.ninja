/*
 * Global Schema.org JSON-LD generator for crazyrat.ninja
 * ------------------------------------------------------
 * Included on every page via <script src="/schema.js"></script>.
 * Detects the page type and language from the URL, reads page metadata
 * (title, description, canonical, og:image) from the DOM, and injects a
 * single linked @graph into <head>. The Person (Tomasz Zysko) and the
 * Organization/Brand (CrazyRat) are shared entities referenced by @id on
 * every page so Google resolves them as one consistent knowledge entity.
 *
 * Google's crawler renders JavaScript, so JSON-LD injected at parse time
 * into <head> is read as structured data.
 */
(function () {
  "use strict";

  var BASE = "https://crazyrat.ninja";
  var PERSON_ID = BASE + "/#person";
  var ORG_ID = BASE + "/#organization";
  var SITE_ID = BASE + "/#website";

  var path = location.pathname;

  // ---- Language ----------------------------------------------------------
  var docLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  var lang =
    docLang.indexOf("pl") === 0 ? "pl" :
    docLang.indexOf("en") === 0 ? "en" :
    /\/pl\//.test(path) ? "pl" :
    /\/szbi\//.test(path) ? "pl" :
    /\/en\//.test(path) ? "en" : "en";

  // ---- Page metadata read from the DOM -----------------------------------
  function meta(sel) {
    var el = document.querySelector(sel);
    return el ? (el.getAttribute("content") || el.getAttribute("href") || "").trim() : "";
  }
  var canonical = meta('link[rel="canonical"]') || (location.origin + location.pathname);
  var ogTitle = meta('meta[property="og:title"]');
  var pageTitle = (ogTitle || document.title || "CrazyRat").trim();
  var primaryName = pageTitle.split("|")[0].trim();            // first title segment
  var description = meta('meta[name="description"]');
  var ogImage = meta('meta[property="og:image"]') || BASE + "/img/tomasz-zysko.jpeg";

  // ---- Shared entities ---------------------------------------------------
  var I18N = {
    en: {
      jobTitle: "Offensive Security Expert",
      personDesc: "Cybersecurity professional with 25+ years of experience in penetration testing, red team operations, and security architecture.",
      knowsAbout: ["Penetration Testing", "Red Team Operations", "Security Architecture", "Web Application Security", "Network Security", "Ethical Hacking", "Cloud Security", "Code Security", "vCISO Consultancy"],
      orgDesc: "Offensive security consultancy led by Tomasz Zysko (CrazyRat), delivering penetration testing, red team operations, security architecture review and vCISO advisory.",
      siteName: "CrazyRat - Tomasz Zysko",
      home: "Home", services: "Services"
    },
    pl: {
      jobTitle: "Ekspert ds. Bezpieczeństwa Ofensywnego",
      personDesc: "Specjalista ds. cyberbezpieczeństwa z ponad 25-letnim doświadczeniem w testach penetracyjnych, operacjach red team i architekturze bezpieczeństwa.",
      knowsAbout: ["Testy Penetracyjne", "Operacje Red Team", "Architektura Bezpieczeństwa", "Bezpieczeństwo Aplikacji Webowych", "Bezpieczeństwo Sieci", "Etyczne Hakowanie", "Bezpieczeństwo Chmury", "Doradztwo vCISO"],
      orgDesc: "Konsulting bezpieczeństwa ofensywnego prowadzony przez Tomasza Zyśko (CrazyRat): testy penetracyjne, operacje red team, przegląd architektury bezpieczeństwa i doradztwo vCISO.",
      siteName: "CrazyRat - Tomasz Zyśko",
      home: "Strona główna", services: "Usługi"
    }
  };
  var t = I18N[lang];

  var person = {
    "@type": "Person",
    "@id": PERSON_ID,
    "name": "Tomasz Zysko",
    "alternateName": "CrazyRat",
    "url": BASE + "/",
    "image": BASE + "/img/tomasz-zysko.jpeg",
    "jobTitle": t.jobTitle,
    "description": t.personDesc,
    "knowsAbout": t.knowsAbout,
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "OSCP" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "OSWP" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "CISSP" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "CEH" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "CPTC" }
    ],
    "alumniOf": [
      { "@type": "Organization", "name": "Hack The Box", "url": "https://app.hackthebox.eu/profile/234030" },
      { "@type": "Organization", "name": "PentesterLab", "url": "https://pentesterlab.com/profile/crazyrat" }
    ],
    "worksFor": { "@id": ORG_ID },
    "sameAs": [
      "https://linkedin.com/in/crazyrat/",
      "https://twitter.com/crazyratpl",
      "https://github.com/crazyrat-software/",
      "https://about.me/tomasz-zysko/",
      "https://learn.microsoft.com/en-gb/users/crazyrat/"
    ]
  };

  var organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    "name": "CrazyRat",
    "url": BASE + "/",
    "logo": { "@type": "ImageObject", "url": BASE + "/img/apple-touch-icon-180x180.png" },
    "image": BASE + "/img/tomasz-zysko.jpeg",
    "description": t.orgDesc,
    "founder": { "@id": PERSON_ID },
    "employee": { "@id": PERSON_ID },
    "sameAs": [
      "https://linkedin.com/in/crazyrat/",
      "https://twitter.com/crazyratpl",
      "https://github.com/crazyrat-software/"
    ]
  };

  var website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    "url": BASE + "/",
    "name": t.siteName,
    "inLanguage": lang,
    "publisher": { "@id": ORG_ID }
  };

  // ---- Page node ---------------------------------------------------------
  var graph = [website, organization, person];

  function webPageBase(type) {
    return {
      "@type": type || "WebPage",
      "@id": canonical + "#webpage",
      "url": canonical,
      "name": pageTitle,
      "description": description || t.personDesc,
      "inLanguage": lang,
      "isPartOf": { "@id": SITE_ID },
      "primaryImageOfPage": ogImage,
      "about": { "@id": PERSON_ID }
    };
  }

  function breadcrumb() {
    return {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": t.home, "item": BASE + "/" + lang + "/" },
        { "@type": "ListItem", "position": 2, "name": t.services, "item": BASE + "/" + lang + "/services/" },
        { "@type": "ListItem", "position": 3, "name": primaryName, "item": canonical }
      ]
    };
  }

  var isHome = new RegExp("^/(en|pl)/(index\\.html)?$").test(path);
  var isAbout = /\/(en|pl)\/about\//.test(path);
  var isContact = /\/(en|pl)\/contact\//.test(path);
  var isServiceDetail = /\/(en|pl)\/services\/[^/]+\.html$/.test(path) && !/\/services\/index\.html$/.test(path);
  var isServicesIndex = /\/(en|pl)\/services\/(index\.html)?$/.test(path);
  var isSzbiDoc = /\/szbi\/docs\//.test(path);
  var isSzbiPortal = /\/szbi\/(index\.html)?$/.test(path);

  if (isHome) {
    var home = webPageBase("WebPage");
    home.mainEntity = { "@id": PERSON_ID };
    graph.push(home);

  } else if (isAbout) {
    var about = webPageBase("ProfilePage");
    about.mainEntity = { "@id": PERSON_ID };
    graph.push(about);

  } else if (isContact) {
    var contact = webPageBase("ContactPage");
    contact.mainEntity = { "@id": PERSON_ID };
    graph.push(contact);

  } else if (isServiceDetail) {
    graph.push({
      "@type": "Service",
      "@id": canonical + "#service",
      "name": primaryName,
      "serviceType": primaryName,
      "description": description,
      "url": canonical,
      "provider": { "@id": ORG_ID },
      "areaServed": "Worldwide",
      "inLanguage": lang
    });
    graph.push(breadcrumb());

  } else if (isServicesIndex) {
    var servicesPage = webPageBase("CollectionPage");
    graph.push(servicesPage);
    graph.push({
      "@type": "Service",
      "@id": canonical + "#service",
      "serviceType": "Cybersecurity Services",
      "name": primaryName,
      "description": description,
      "url": canonical,
      "provider": { "@id": ORG_ID },
      "areaServed": "Worldwide",
      "inLanguage": lang
    });

  } else if (isSzbiPortal) {
    graph.push({
      "@type": "Product",
      "@id": canonical + "#product",
      "name": "SZBI NIS2 / KSC – Dokumentacja Systemu Zarządzania Bezpieczeństwem Informacji",
      "description": "Komercyjny, gotowy do wdrożenia pakiet dokumentacji SZBI zgodny z dyrektywą NIS2, polską ustawą KSC oraz ISO/IEC 27001. Wersja angielska w przygotowaniu.",
      "url": canonical,
      "image": ogImage,
      "inLanguage": "pl",
      "category": "Information Security Management System Documentation",
      "brand": { "@id": ORG_ID },
      "manufacturer": { "@id": ORG_ID },
      "author": { "@id": PERSON_ID },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "PLN",
        "businessFunction": "http://purl.org/goodrelations/v1#Sell",
        "seller": { "@id": ORG_ID },
        "url": canonical
      }
    });

  } else if (isSzbiDoc) {
    graph.push({
      "@type": "TechArticle",
      "@id": canonical + "#article",
      "headline": primaryName,
      "name": pageTitle,
      "description": description,
      "url": canonical,
      "inLanguage": "pl",
      "isAccessibleForFree": false,
      "author": { "@id": PERSON_ID },
      "publisher": { "@id": ORG_ID },
      "isPartOf": { "@type": "Product", "@id": BASE + "/szbi/#product", "name": "SZBI NIS2 / KSC – Dokumentacja Systemu Zarządzania Bezpieczeństwem Informacji" }
    });

  } else {
    // Root redirect stub and other utility pages: still promote the entities.
    var generic = webPageBase("WebPage");
    graph.push(generic);
  }

  // ---- Inject ------------------------------------------------------------
  var data = { "@context": "https://schema.org", "@graph": graph };
  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  (document.head || document.documentElement).appendChild(script);
})();

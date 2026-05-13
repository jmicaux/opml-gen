(function () {
  var form = document.getElementById('generator-form');
  var feeds = document.getElementById('feeds');
  var title = document.getElementById('opml-title');
  var output = document.getElementById('output');
  var status = document.getElementById('status');
  var downloadLink = document.getElementById('download-link');
  var copyButton = document.getElementById('copy-button');
  var currentObjectUrl = null;
  var currentOpml = '';

  function normalizeUrl(value) {
    return value.trim();
  }

  function isHttpUrl(value) {
    try {
      var url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      return false;
    }
  }

  function escapeXml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function uniqueValues(values) {
    var seen = Object.create(null);
    return values.filter(function (value) {
      if (seen[value]) {
        return false;
      }
      seen[value] = true;
      return true;
    });
  }

  function buildOpml(feedUrls, opmlTitle) {
    var now = new Date().toUTCString();
    var safeTitle = escapeXml(opmlTitle || 'RSS feeds');
    var outlines = feedUrls.map(function (url) {
      var safeUrl = escapeXml(url);
      return '    <outline text="' + safeUrl + '" title="' + safeUrl + '" type="rss" xmlUrl="' + safeUrl + '" />';
    }).join('\n');

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<opml version="2.0">',
      '  <head>',
      '    <title>' + safeTitle + '</title>',
      '    <dateCreated>' + escapeXml(now) + '</dateCreated>',
      '  </head>',
      '  <body>',
      outlines,
      '  </body>',
      '</opml>'
    ].join('\n');
  }

  function setDownload(opml) {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
    }

    currentObjectUrl = URL.createObjectURL(new Blob([opml], {
      type: 'text/x-opml;charset=utf-8'
    }));
    downloadLink.href = currentObjectUrl;
    downloadLink.classList.remove('is-disabled');
    downloadLink.removeAttribute('aria-disabled');
    copyButton.disabled = false;
  }

  function resetResult(message, isError) {
    currentOpml = '';
    output.textContent = '';
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
    downloadLink.href = '#';
    downloadLink.classList.add('is-disabled');
    downloadLink.setAttribute('aria-disabled', 'true');
    copyButton.disabled = true;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var urls = feeds.value
      .split(/\r?\n/)
      .map(normalizeUrl)
      .filter(Boolean);

    urls = uniqueValues(urls);

    var invalidUrls = urls.filter(function (url) {
      return !isHttpUrl(url);
    });

    if (!urls.length) {
      resetResult('Paste at least one RSS feed URL.', true);
      return;
    }

    if (invalidUrls.length) {
      resetResult('Invalid URL: ' + invalidUrls[0], true);
      return;
    }

    currentOpml = buildOpml(urls, title.value.trim());
    output.textContent = currentOpml;
    status.textContent = urls.length + ' feed' + (urls.length > 1 ? 's' : '') + ' added to the OPML file.';
    status.classList.remove('is-error');
    setDownload(currentOpml);
  });

  copyButton.addEventListener('click', function () {
    if (!currentOpml) {
      return;
    }

    navigator.clipboard.writeText(currentOpml).then(function () {
      status.textContent = 'OPML copied to clipboard.';
      status.classList.remove('is-error');
    }).catch(function () {
      status.textContent = 'Copy failed. You can select the generated OPML manually.';
      status.classList.add('is-error');
    });
  });
}());

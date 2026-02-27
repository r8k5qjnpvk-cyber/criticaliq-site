/**
 * CriticalIQ — Minimal Cookie Notice Banner
 * 
 * USAGE: Add this to every page just before </body>:
 *   <script src="/cookie-notice.js"></script>
 *
 * Since CriticalIQ uses only strictly necessary cookies (Cloudflare security),
 * no consent mechanism is required under PECR — just a notice with a link
 * to the Cookie Policy. The banner is dismissable and remembers dismissal
 * for 90 days via a single strictly-necessary cookie.
 */
(function () {
  // Check if already dismissed (using a minimal cookie)
  if (document.cookie.indexOf('ciq_cookie_notice=1') !== -1) return;

  // Create banner
  var banner = document.createElement('div');
  banner.id = 'ciq-cookie-notice';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML =
    '<div class="ciq-cn-inner">' +
    '<p>This site uses only essential cookies for security. No tracking or analytics cookies are used. ' +
    '<a href="/cookies.html">Cookie Policy</a></p>' +
    '<button id="ciq-cn-dismiss" aria-label="Dismiss cookie notice">OK</button>' +
    '</div>';

  // Styles
  var style = document.createElement('style');
  style.textContent =
    '#ciq-cookie-notice{' +
    'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
    'background:rgba(14,26,43,0.95);backdrop-filter:blur(12px);' +
    'border-top:1px solid rgba(255,255,255,0.1);' +
    'padding:14px 5%;font-family:"Outfit",sans-serif;' +
    'animation:ciq-cn-in 0.3s ease-out;' +
    '}' +
    '#ciq-cookie-notice .ciq-cn-inner{' +
    'max-width:1100px;margin:0 auto;' +
    'display:flex;align-items:center;justify-content:space-between;gap:20px;' +
    'flex-wrap:wrap;' +
    '}' +
    '#ciq-cookie-notice p{' +
    'color:rgba(255,255,255,0.85);font-size:0.85rem;line-height:1.5;margin:0;' +
    '}' +
    '#ciq-cookie-notice a{' +
    'color:#60a5fa;text-decoration:underline;' +
    '}' +
    '#ciq-cookie-notice a:hover{color:#93c5fd;}' +
    '#ciq-cn-dismiss{' +
    'background:#0070f3;color:white;border:none;border-radius:6px;' +
    'padding:8px 22px;font-size:0.85rem;font-weight:600;cursor:pointer;' +
    'font-family:"Outfit",sans-serif;white-space:nowrap;' +
    'transition:background 0.15s;' +
    '}' +
    '#ciq-cn-dismiss:hover{background:#0060d0;}' +
    '@keyframes ciq-cn-in{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}' +
    '@media(max-width:600px){' +
    '#ciq-cookie-notice .ciq-cn-inner{flex-direction:column;text-align:center;gap:12px;}' +
    '}';

  document.head.appendChild(style);
  document.body.appendChild(banner);

  // Dismiss handler
  document.getElementById('ciq-cn-dismiss').addEventListener('click', function () {
    // Set a strictly-necessary cookie to remember dismissal (90 days)
    var d = new Date();
    d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);
    document.cookie = 'ciq_cookie_notice=1;expires=' + d.toUTCString() + ';path=/;SameSite=Lax;Secure';
    banner.style.animation = 'none';
    banner.style.transition = 'transform 0.25s ease-in, opacity 0.25s ease-in';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(function () { banner.remove(); }, 300);
  });
})();

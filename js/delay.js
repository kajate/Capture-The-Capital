document.addEventListener('DOMContentLoaded', function () {
    var element = document.createElement('script');
    element.src =
        'http://maps.google.com/maps/api/js?sensor=true&amp;callback=Initialize';
    element.type = 'text/javascript';
    var scripts = document.getElementsByTagName('script')[0];
    scripts.parentNode.insertBefore(element, scripts);
}, false);
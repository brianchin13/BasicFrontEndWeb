const cacheName = 'UCCD2323';

const staticAssets = [
    './css/default.css',
    './css/aos.css',
    './css/bootstrap.min.css',
    './css/bootstrap.min.css.map',
    './css/jquery.datetimepicker.min.css',
    './css/sweetalert2.min.css',
    './font-awesome/css/font-awesome.min.css',
    './font-awesome/css/font-awesome.css',
    './js/jquery-3.6.0.min.js',
    './js/aos.js',
    './js/default.js',
    './js/anime.min.js',
    './js/bootstrap.min.js',
    './js/bootstrap.min.js.map',
    './js/jquery.datetimepicker.full.min.js',
    './js/sweetalert2.all.min.js',
    './js/popper.min.js',
    './js/popper.min.js.map',
    './about.html',
    './contact.html',
    './courses.html',
    './homepage.html',
    './registerForm.html',
    './manifest.json',
    //image
    './images/boxbg.png',
    './images/course11.png',
    './images/course12.jpeg',
    './images/course21.jpeg',
    './images/course22.png',
    './images/course31.jpeg',
    './images/course32.jpeg',
    './images/course41.jpeg',
    './images/course42.jpeg',
    './images/course51.jpeg',
    './images/course52.jpeg',
    './images/discreteTutor.jpeg',
    './images/homeimg1.jpeg',
    './images/homeimg2.jpeg',
    './images/homeimg3.jpeg',
    './images/icon-65x65.png',
    './images/icon-150x150.png',
    './images/infobg.jpeg',
    './images/logo.png',
    './images/photoshopTutor.jpeg',
    './images/pythonTutor.jpeg',
    './images/webTutor.jpeg'
];


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(staticAssets);
            })
    );
    console.log("Downloading Caches");
    return self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    console.log("Downloaded Caches");
});

self.addEventListener('fetch', function (event) {
    console.log('fetch for ,', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});

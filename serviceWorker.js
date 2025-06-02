const CacheKey = "quiz-cache-v1";

const initialCacheUrls = [
    // HTML
    "./",
    "./index.html",
    // CSS
    "./css/styles.css",
    "./css/base.css",
    "./css/headerMainFooter.css",
    "./css/sections/common.css",
    "./css/sections/home.css",
    "./css/sections/genres.css",
    "./css/sections/musicians.css",
    "./css/sections/quiz/common.css",
    "./css/sections/quiz/setup.css",
    "./css/sections/quiz/quiz.css",
    "./css/sections/quiz/results.css",
    // JavaScript
    "./serviceworker.js",
    "./js/history/formHistory.js",
    "./js/history/sectionHistory.js",
    "./js/htmlFiller/genresSectionFiller.js",
    "./js/htmlFiller/musiciansSectionFiller.js",
    "./js/htmlFiller/quizFormFiller.js",
    "./js/model/configParser.js",
    "./js/model/entities.js",
    "./js/model/global.js",
    "./js/model/quiz.js",
    "./js/navigation/navigation.js",
    "./js/navigation/showActive.js",
    "./js/quiz/answerProvider.js",
    "./js/quiz/audioPlayer.js",
    "./js/quiz/formAutomaton.js",
    "./js/quiz/quizGenerator.js",
    "./js/quiz/quizLogic.js",
    "./js/quiz/quizRender.js",
    "./js/app.js",
    "./js/onloadActions.js",
    "./js/utils.js",
    // Audio
    "./static/audio/fail.mp3",
    "./static/audio/success.mp3",
    "./static/audio/grunge/nirvana/girl/full.mp3",
    "./static/audio/grunge/nirvana/girl/long.mp3",
    "./static/audio/grunge/nirvana/girl/normal.mp3",
    "./static/audio/grunge/nirvana/girl/short.mp3",
    "./static/audio/grunge/nirvana/lithium/full.mp3",
    "./static/audio/grunge/nirvana/lithium/long.mp3",
    "./static/audio/grunge/nirvana/lithium/normal.mp3",
    "./static/audio/grunge/nirvana/lithium/short.mp3",
    "./static/audio/grunge/nirvana/polly/full.mp3",
    "./static/audio/grunge/nirvana/polly/long.mp3",
    "./static/audio/grunge/nirvana/polly/normal.mp3",
    "./static/audio/grunge/nirvana/polly/short.mp3",
    "./static/audio/grunge/nirvana/spirit/full.mp3",
    "./static/audio/grunge/nirvana/spirit/long.mp3",
    "./static/audio/grunge/nirvana/spirit/normal.mp3",
    "./static/audio/grunge/nirvana/spirit/short.mp3",
    "./static/audio/legend/beatles/night/full.mp3",
    "./static/audio/legend/beatles/night/long.mp3",
    "./static/audio/legend/beatles/night/normal.mp3",
    "./static/audio/legend/beatles/night/short.mp3",
    "./static/audio/legend/beatles/submarine/full.mp3",
    "./static/audio/legend/beatles/submarine/long.mp3",
    "./static/audio/legend/beatles/submarine/normal.mp3",
    "./static/audio/legend/beatles/submarine/short.mp3",
    "./static/audio/legend/beatles/yesterday/full.mp3",
    "./static/audio/legend/beatles/yesterday/long.mp3",
    "./static/audio/legend/beatles/yesterday/normal.mp3",
    "./static/audio/legend/beatles/yesterday/short.mp3",
    "./static/audio/legend/queen/champions/full.mp3",
    "./static/audio/legend/queen/champions/long.mp3",
    "./static/audio/legend/queen/champions/normal.mp3",
    "./static/audio/legend/queen/champions/short.mp3",
    "./static/audio/legend/queen/dust/full.mp3",
    "./static/audio/legend/queen/dust/long.mp3",
    "./static/audio/legend/queen/dust/normal.mp3",
    "./static/audio/legend/queen/dust/short.mp3",
    "./static/audio/legend/queen/free/full.mp3",
    "./static/audio/legend/queen/free/long.mp3",
    "./static/audio/legend/queen/free/normal.mp3",
    "./static/audio/legend/queen/free/short.mp3",
    "./static/audio/legend/queen/show/full.mp3",
    "./static/audio/legend/queen/show/long.mp3",
    "./static/audio/legend/queen/show/normal.mp3",
    "./static/audio/legend/queen/show/short.mp3",
    "./static/audio/legend/stones/gimme/full.mp3",
    "./static/audio/legend/stones/gimme/long.mp3",
    "./static/audio/legend/stones/gimme/normal.mp3",
    "./static/audio/legend/stones/gimme/short.mp3",
    "./static/audio/legend/stones/paint/full.mp3",
    "./static/audio/legend/stones/paint/long.mp3",
    "./static/audio/legend/stones/paint/normal.mp3",
    "./static/audio/legend/stones/paint/short.mp3",
    "./static/audio/legend/stones/satisfaction/full.mp3",
    "./static/audio/legend/stones/satisfaction/long.mp3",
    "./static/audio/legend/stones/satisfaction/normal.mp3",
    "./static/audio/legend/stones/satisfaction/short.mp3",
    "./static/audio/punk/shut/dagon/full.mp3",
    "./static/audio/punk/shut/dagon/long.mp3",
    "./static/audio/punk/shut/dagon/normal.mp3",
    "./static/audio/punk/shut/dagon/short.mp3",
    "./static/audio/punk/shut/joker/full.mp3",
    "./static/audio/punk/shut/joker/long.mp3",
    "./static/audio/punk/shut/joker/normal.mp3",
    "./static/audio/punk/shut/joker/short.mp3",
    "./static/audio/punk/shut/kukla/full.mp3",
    "./static/audio/punk/shut/kukla/long.mp3",
    "./static/audio/punk/shut/kukla/normal.mp3",
    "./static/audio/punk/shut/kukla/short.mp3",
    "./static/audio/punk/shut/lesnik/full.mp3",
    "./static/audio/punk/shut/lesnik/long.mp3",
    "./static/audio/punk/shut/lesnik/normal.mp3",
    "./static/audio/punk/shut/lesnik/short.mp3",
    "./static/audio/punk/shut/meat/full.mp3",
    "./static/audio/punk/shut/meat/long.mp3",
    "./static/audio/punk/shut/meat/normal.mp3",
    "./static/audio/punk/shut/meat/short.mp3",
    "./static/audio/punk/shut/town/full.mp3",
    "./static/audio/punk/shut/town/long.mp3",
    "./static/audio/punk/shut/town/normal.mp3",
    "./static/audio/punk/shut/town/short.mp3",
    "./static/audio/rock/acdc/back/full.mp3",
    "./static/audio/rock/acdc/back/long.mp3",
    "./static/audio/rock/acdc/back/normal.mp3",
    "./static/audio/rock/acdc/back/short.mp3",
    "./static/audio/rock/acdc/bells/full.mp3",
    "./static/audio/rock/acdc/bells/long.mp3",
    "./static/audio/rock/acdc/bells/normal.mp3",
    "./static/audio/rock/acdc/bells/short.mp3",
    "./static/audio/rock/acdc/highway/full.mp3",
    "./static/audio/rock/acdc/highway/long.mp3",
    "./static/audio/rock/acdc/highway/normal.mp3",
    "./static/audio/rock/acdc/highway/short.mp3",
    "./static/audio/rock/acdc/thunder/full.mp3",
    "./static/audio/rock/acdc/thunder/long.mp3",
    "./static/audio/rock/acdc/thunder/normal.mp3",
    "./static/audio/rock/acdc/thunder/short.mp3",
    "./static/audio/rock/acdc/tnt/full.mp3",
    "./static/audio/rock/acdc/tnt/long.mp3",
    "./static/audio/rock/acdc/tnt/normal.mp3",
    "./static/audio/rock/acdc/tnt/short.mp3",
    "./static/audio/rock/metallica/bell/full.mp3",
    "./static/audio/rock/metallica/bell/long.mp3",
    "./static/audio/rock/metallica/bell/normal.mp3",
    "./static/audio/rock/metallica/bell/short.mp3",
    "./static/audio/rock/metallica/nothing/full.mp3",
    "./static/audio/rock/metallica/nothing/long.mp3",
    "./static/audio/rock/metallica/nothing/normal.mp3",
    "./static/audio/rock/metallica/nothing/short.mp3",
    "./static/audio/rock/metallica/puppet/full.mp3",
    "./static/audio/rock/metallica/puppet/long.mp3",
    "./static/audio/rock/metallica/puppet/normal.mp3",
    "./static/audio/rock/metallica/puppet/short.mp3",
    "./static/audio/rock/metallica/roam/full.mp3",
    "./static/audio/rock/metallica/roam/long.mp3",
    "./static/audio/rock/metallica/roam/normal.mp3",
    "./static/audio/rock/metallica/roam/short.mp3",
    "./static/audio/rock/metallica/sandman/full.mp3",
    "./static/audio/rock/metallica/sandman/long.mp3",
    "./static/audio/rock/metallica/sandman/normal.mp3",
    "./static/audio/rock/metallica/sandman/short.mp3",
    "./static/audio/rock/metallica/unforgiven/full.mp3",
    "./static/audio/rock/metallica/unforgiven/long.mp3",
    "./static/audio/rock/metallica/unforgiven/normal.mp3",
    "./static/audio/rock/metallica/unforgiven/short.mp3",
    // Images
    "static/img/genres/grunge/musicians/nirvana/bleach.jpg",
    "static/img/genres/grunge/musicians/nirvana/musician.png",
    "static/img/genres/grunge/musicians/nirvana/nevermind.jpg",
    "static/img/genres/grunge/grunge.png",
    "static/img/genres/legend/musicians/beatles/help.png",
    "static/img/genres/legend/musicians/beatles/musician.jpg",
    "static/img/genres/legend/musicians/beatles/night.jpg",
    "static/img/genres/legend/musicians/beatles/submarine.jpg",
    "static/img/genres/legend/musicians/queen/game.png",
    "static/img/genres/legend/musicians/queen/innuendo.png",
    "static/img/genres/legend/musicians/queen/musician.png",
    "static/img/genres/legend/musicians/queen/news.png",
    "static/img/genres/legend/musicians/queen/works.png",
    "static/img/genres/legend/musicians/stones/aftermath.jpg",
    "static/img/genres/legend/musicians/stones/bleed.jpg",
    "static/img/genres/legend/musicians/stones/heads.jpg",
    "static/img/genres/legend/musicians/stones/musician.jpg",
    "static/img/genres/legend/legend.jpg",
    "static/img/genres/punk/musicians/shut/acoustic.jpg",
    "static/img/genres/punk/musicians/shut/musician.jpg",
    "static/img/genres/punk/musicians/shut/seller.jpg",
    "static/img/genres/punk/musicians/shut/shadow.jpg",
    "static/img/genres/punk/musicians/shut/shut.jpg",
    "static/img/genres/punk/punk.jpg",
    "static/img/genres/rock/musicians/acdc/back.png",
    "static/img/genres/rock/musicians/acdc/highway.jpg",
    "static/img/genres/rock/musicians/acdc/musician.jpg",
    "static/img/genres/rock/musicians/acdc/razor.jpg",
    "static/img/genres/rock/musicians/acdc/voltage.jpg",
    "static/img/genres/rock/musicians/metallica/lightning.jpg",
    "static/img/genres/rock/musicians/metallica/musician.jpg",
    "static/img/genres/rock/musicians/metallica/puppet.jpg",
    "static/img/genres/rock/musicians/metallica/sandman.jpg",
    "static/img/genres/rock/rock.png",
    "static/img/svg/placeholder.svg",
    "static/img/svg/question.svg",
    // Config
    "static/config/entities.json"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CacheKey).then(async cache => {
            for (const url of initialCacheUrls) {
                try {
                    await cache.add(url);
                } catch (err) {
                    console.error(`Failed to cache: ${url}`, err);
                }
            }
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CacheKey) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return (
                response ||
                fetch(e.request).catch(() => {
                    if (e.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                    return new Response('', {
                        status: 404,
                        statusText: 'Not found in offline cache',
                    });
                })
            );
        })
    );
});

const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const cors = require('cors');

const manifest = {
    id: 'org.miscanales.favoritos',
    version: '1.1.2',
    name: 'Favoritos IPTV',
    description: 'Canales IPTV Favoritos',
    resources: ['catalog', 'meta', 'stream'],
    types: ['tv'],
    idPrefixes: ['canal'],
    catalogs: [{
        type: 'tv',
        id: 'favoritos',
        name: 'Favoritos',
        extra: [
            {
                name: 'skip',
                isRequired: false
            }
        ]
    }],
    behaviorHints: {
        adult: false,
        p2p: false,
        configurable: false,
        configurationRequired: false
    }
};

const builder = new addonBuilder(manifest);

const canales = [
    {
        id: 'canal_htv',
        name: 'HTV',
        description: 'HTV Music Channel',
        poster: 'https://i.imgur.com/NlKFNHS.png',
        url: 'https://cors-proxy.cooks.fyi/https://streamer1.nexgen.bz/HTV/index.m3u8'
    },
{
  id: 'canal_dazn_f1',
  name: 'DAZN F1 España',
  description: 'DAZN F1 España (Movistar)',
  poster: '', // logo si lo tienes
  url: 'http://66.70.176.103:8081/SPAIN%7CMOVISTARF1/SPAIN%7CMOVISTARF1/playlist.m3u8'
}
,

    {
        id: 'canal_8tvplus',
        name: 'Canal 8 TV+',
        description: 'Canal 8 TV+ (720p)',
        poster: 'https://i.imgur.com/peOIG1F.png',
        url: 'https://movil.ejeserver.com/live/canal8tv.m3u8'
    },
    {
        id: 'canal_tro',
        name: 'Canal TRO',
        description: 'Canal TRO (1080p)',
        poster: 'https://i.imgur.com/bdBduvj.png',
        url: 'https://cors-proxy.cooks.fyi/https://stream.canaltro.com:19360/canaltro/playlist.m3u8'
    },
    {
        id: 'canal_mtv_hits_europe',
        name: 'MTV Hits Europe',
        description: 'MTV Hits Europe',
        poster: 'https://i.imgur.com/zNscEST.png',
        url: 'http://45.88.92.3/tr3_MTVHits_SD/index.m3u8?token=test'
    },
    {
        id: 'canal_venevision_internacional',
        name: 'Venevisión Internacional',
        description: 'Venevisión Internacional (720p)',
        poster: 'https://i.imgur.com/vtGED07.jpg',
        url: 'https://vod2live.univtec.com/manifest/4c41c0d8-e2e4-43cc-bd43-79afe715e1b3.m3u8'
    },
    {
        id: 'canal_rcn_mas',
        name: 'RCN Más',
        description: 'RCN Más (1080p)',
        poster: 'https://i.imgur.com/MJzuRAN.png',
        url: 'https://rcntv-rcnmas-1-us.plex.wurl.tv/playlist.m3u8'
    },
    {
        id: 'canal_anzoategui_tv',
        name: 'Anzoátegui TV',
        description: 'Anzoátegui TV (360p)',
        poster: 'https://i.imgur.com/SLqrEOz.png',
        url: 'https://vcp2.myplaytv.com/anzoateguitv/anzoateguitv/playlist.m3u8'
    },
    {
        id: 'canal_evtv_miami',
        name: 'EVTV Miami',
        description: 'EVTV Miami (720p)',
        poster: 'https://i.ibb.co/G5hThMZ/cropped-evtv-Web-Guidelines-1-300x183-1.png',
        url: 'https://streannliveevtv.cachefly.net/Protected/sp=1;dirmatch=true/3be25dc13406bf70ff0208230e6fa803b88b95013fad257c025e481e2be3e214/evtv1/evtv1/playlist.m3u8'
    },
    {
        id: 'canal_televisora_oriente',
        name: 'Televisora de Oriente',
        description: 'Televisora de Oriente (406p)',
        poster: 'https://i.imgur.com/wFC6Xxq.png',
        url: 'https://cloud.fastchannel.es/manifiest/hls/prog9/tvo.m3u8'
    },
{
    id: 'canal_disney_channel',
    name: 'Disney Channel',
    description: 'Disney Channel',
    poster: 'https://i.pinimg.com/736x/ca/5b/0e/ca5b0e426c43b1b1d4fc5ad55dcd8111.jpg',
    url: 'https://list.iptvcat.com/my_list/s/50bb47d21255a5fa4acec80846128711.m3u8'
},
{
    id: 'canal_sky_news',
    name: 'Sky News',
    description: 'Sky News',
    poster: '',
    url: 'https://list.iptvcat.com/my_list/s/8c7dade45bcc738700d44ea8674b5c4d.m3u8'
},
{
    id: 'canal_globovision',
    name: 'Globovisión',
    description: 'Globovisión',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Logo-Globovisi%C3%B3n.png',
    url: 'https://list.iptvcat.com/my_list/s/589cb889b5f1c80871bb3129a107ca05.m3u8'
},
{
    id: 'canal_televen',
    name: 'Televen',
    description: 'Televen',
    poster: '',
    url: 'https://list.iptvcat.com/my_list/s/623e68f52fc0ed5dda7f816c5ff91096.m3u8'
},
{
    id: 'canal_nickelodeon_us',
    name: 'Nickelodeon',
    description: 'Nickelodeon US',
    poster: 'https://images.seeklogo.com/logo-png/43/1/nickelodeon-logo-png_seeklogo-435571.png',
    url: 'http://23.237.104.106:8080/USA_NICKELODEON/index.m3u8'
},
{
    id: 'canal_nickelodeon_spain',
    name: 'Nickelodeon Spain',
    description: 'Nickelodeon Spain (576p)',
    poster: 'https://images.seeklogo.com/logo-png/43/1/nickelodeon-logo-png_seeklogo-435571.png',
    url: 'http://185.189.225.150:85/nickelodeon/index.m3u8'
},
{
    id: 'canal_directv_sports',
    name: 'DIRECTV SPORTS',
    description: 'DIRECTV SPORTS',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DirecTV_Sports_logo.svg/1200px-DirecTV_Sports_logo.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/1017.m3u8'
},
{
    id: 'canal_directv_sports_2',
    name: 'DIRECTV SPORTS 2',
    description: 'DIRECTV SPORTS 2',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/DirecTV_Sports_logo.svg/1200px-DirecTV_Sports_logo.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/2863.m3u8'
},
{
    id: 'canal_espn',
    name: 'ESPN',
    description: 'ESPN',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1200px-ESPN_wordmark.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/91.m3u8'
},
{
    id: 'canal_espn_ar',
    name: 'ESPN (AR)',
    description: 'ESPN Argentina',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1200px-ESPN_wordmark.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/2858.m3u8'
},
{
    id: 'canal_espn_2',
    name: 'ESPN 2',
    description: 'ESPN 2',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/ESPN2_logo.svg/1200px-ESPN2_logo.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/92.m3u8'
},
{
    id: 'canal_espn_3',
    name: 'ESPN 3',
    description: 'ESPN 3',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/ESPN3_Logo.png/1200px-ESPN3_Logo.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/93.m3u8'
},
{
    id: 'canal_espn_3_ar',
    name: 'ESPN 3 (AR)',
    description: 'ESPN 3 Argentina',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/ESPN3_Logo.png/1200px-ESPN3_Logo.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/2860.m3u8'
},
{
    id: 'canal_espn_deportes',
    name: 'ESPN DEPORTES',
    description: 'ESPN DEPORTES',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1200px-ESPN_wordmark.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3990.m3u8'
},
{
    id: 'canal_bein_laliga_es',
    name: 'beIN LaLiga ES',
    description: 'beIN LaLiga España',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/460.m3u8'
},
{
    id: 'canal_bein_sports_es',
    name: 'beIN Sports ES',
    description: 'beIN Sports España',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/442.m3u8'
},
{
    id: 'canal_bein_sports_hd',
    name: 'beIN Sports HD',
    description: 'beIN Sports HD',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/473.m3u8'
},
{
    id: 'canal_beinsports_3',
    name: 'BEINSPORTS 3',
    description: 'BEINSPORTS 3',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3281.m3u8'
},
{
    id: 'canal_beinsports_4',
    name: 'BEINSPORTS 4',
    description: 'BEINSPORTS 4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3282.m3u8'
},
{
    id: 'canal_beinsports_5',
    name: 'BEINSPORTS 5',
    description: 'BEINSPORTS 5',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3283.m3u8'
},
{
    id: 'canal_beinsports_6',
    name: 'BEINSPORTS 6',
    description: 'BEINSPORTS 6',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3284.m3u8'
},
{
    id: 'canal_beinsports_7',
    name: 'BEINSPORTS 7',
    description: 'BEINSPORTS 7',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3285.m3u8'
},
{
    id: 'canal_beinsports_8',
    name: 'BEINSPORTS 8',
    description: 'BEINSPORTS 8',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3286.m3u8'
},
{
    id: 'canal_beinsports_9',
    name: 'BEINSPORTS 9',
    description: 'BEINSPORTS 9',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3287.m3u8'
},
{
    id: 'canal_beinsports_10',
    name: 'BEINSPORTS 10',
    description: 'BEINSPORTS 10',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BeIN_Sports_logo_%282017%29.png/1200px-BeIN_Sports_logo_%282017%29.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/3288.m3u8'
},
{
    id: 'canal_movistar_f1_hd',
    name: 'MOVISTAR F1 HD (ES)',
    description: 'MOVISTAR F1 HD España',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Movistar_F1_logo.svg/1200px-Movistar_F1_logo.svg.png',
    url: 'http://158.69.52.43:8000/live/bob/2345/431.m3u8'
}

];

builder.defineCatalogHandler(({ type, id, extra }) => {
    console.log('Catalog request:', { type, id, extra });
    
    if (type !== 'tv' || id !== 'favoritos') {
        console.log('Invalid catalog request');
        return Promise.resolve({ metas: [] });
    }

    const skip = parseInt(extra?.skip) || 0;
    const metas = canales.slice(skip).map(c => ({
        id: c.id,
        type: 'tv',
        name: c.name,
        description: c.description,
        poster: c.poster || 'https://via.placeholder.com/300x450/000000/FFFFFF?text=' + encodeURIComponent(c.name),
        genres: ['IPTV', 'Live TV'],
        releaseInfo: 'Live Stream'
    }));

    console.log(`Returning ${metas.length} metas`);
    return Promise.resolve({ metas });
});

builder.defineMetaHandler(({ type, id }) => {
    console.log('Meta request for', id);
    const canal = canales.find(c => c.id === id);
    if (!canal || type !== 'tv') return Promise.resolve({ meta: null });

    return Promise.resolve({
        meta: {
            id: canal.id,
            type: 'tv',
            name: canal.name,
            description: canal.description,
            poster: canal.poster || 'https://via.placeholder.com/300x450/000000/FFFFFF?text=' + encodeURIComponent(canal.name),
            background: canal.poster || 'https://via.placeholder.com/1920x1080/000000/FFFFFF?text=' + encodeURIComponent(canal.name),
            genres: ['IPTV', 'Live TV'],
            runtime: '24/7 Live Stream',
            year: new Date().getFullYear()
        }
    });
});

builder.defineStreamHandler(({ type, id }) => {
    console.log('Stream request for', id);
    const canal = canales.find(c => c.id === id);
    if (!canal) return Promise.resolve({ streams: [] });

    return Promise.resolve({
        streams: [{
            title: canal.name,
            url: canal.url
        }]
    });
});


const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Accept', 'User-Agent', 'Authorization', 'X-Requested-With'],
    credentials: false,
    optionsSuccessStatus: 200
};

serveHTTP(builder.getInterface(), { 
    port: process.env.PORT || 43001,
    cors: corsOptions
});

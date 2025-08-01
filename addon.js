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
    poster: 'https://logos-world.net/wp-content/uploads/2021/08/Disney-Channel-Logo-2002-2014.png',
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
    poster: 'https://www.citypng.com/public/uploads/preview/hd-nickelodeon-nick-splash-logo-icon-png-701751694710415awui6lgjdm.png',
    url: 'http://23.237.104.106:8080/USA_NICKELODEON/index.m3u8'
},
{
    id: 'canal_nickelodeon_spain',
    name: 'Nickelodeon Spain',
    description: 'Nickelodeon Spain (576p)',
    poster: 'https://www.citypng.com/public/uploads/preview/hd-nickelodeon-nick-splash-logo-icon-png-701751694710415awui6lgjdm.png',
    url: 'http://185.189.225.150:85/nickelodeon/index.m3u8'
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

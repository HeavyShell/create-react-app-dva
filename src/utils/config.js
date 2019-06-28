import {OrderedMap,OrderedSet,Map,fromJS} from 'immutable'

const menuGlobal=[
    {
        id:'login',
        pid:'0',
        name:'App.login',
        icon:'user',
        path: '/login',
        models: () => [import('../models/login')], //models可多个
        component: () => import('../routes/login'),
    }, 
    {
        id:'books',
        pid:'0',
        name:'App.menuBooks',
        icon:'book',
        display:'block',
        path: '/books',
        models: '', //models可多个
        component: '',
    }, 
    {
        id:'books-classicalHistory',
        pid:'books',
        name:'App.menuClassicalHistory',
        icon:'file',
        display:'block',
        path: '/books/classicalHistory',
        models: '', //models可多个
        component: '',
    }, 
    {
        id:'books-classicalHistory-AncientPoetry',
        pid:'books-classicalHistory',
        name:'App.menuAncientPoetry',
        icon:'file-text',
        display:'block',
        path: '/books/classicalHistory/AncientPoetry',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/classicalHistory/AncientPoetry'),
    }, 
    {
        id:'books-classicalHistory-AncientWords',
        pid:'books-classicalHistory',
        name:'App.menuAncientWords',
        icon:'file-word',
        display:'block',
        path: '/books/classicalHistory/AncientWords',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/classicalHistory/AncientWords'),
    }, 
    {
        id:'books-classicalHistory-SongBrowsing',
        pid:'books-classicalHistory',
        name:'App.menuSongBrowsing',
        icon:'file-excel',
        display:'block',
        path: '/books/classicalHistory/SongBrowsing',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/classicalHistory/SongBrowsing'),
    }, 
    {
        id:'books-modernLiterature',
        pid:'books',
        name:'App.menuModernLiterature',
        icon:'file-markdown',
        display:'block',
        path: '/books/modernLiterature',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/modernLiterature'),
    }, 
    {
        id:'books-childrenBooks',
        pid:'books',
        name:'App.menuChildrenBooks',
        icon:'file-pdf',
        display:'block',
        path: '/books/childrenBooks',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/childrenBooks'),
    }, 
    {
        id:'books-fiction',
        pid:'books',
        name:'App.menuFiction',
        icon:'file-jpg',
        display:'block',
        path: '/books/fiction',
        models: () => [import('../models/books')], //models可多个
        component: () => import('../routes/books/fiction'),
    }, 
    {
        id:'film',
        pid:'0',
        name:'App.menuFilm',
        icon:'play-circle',
        display:'block',
        path: '/film',
        models: '', //models可多个
        component: '',
    }, 
    {
        id:'film-europeAmerica',
        pid:'film',
        name:'App.menuEuropeAmerica',
        icon:'dribbble',
        display:'block',
        path: '/film/europeAmerica',
        models: () => [import('../models/film')], //models可多个
        component: () => import('../routes/film/europeAmerica'),
    }, 
    {
        id:'film-mainland',
        pid:'film',
        name:'App.menuMainland',
        icon:'api',
        display:'block',
        path: '/film/mainland',
        models: () => [import('../models/film')], //models可多个
        component: () => import('../routes/film/mainland'),
    }, 
    {
        id:'film-hongKong',
        pid:'film',
        name:'App.menuHongKong',
        icon:'trophy',
        display:'block',
        path: '/film/hongKong',
        models: () => [import('../models/film')], //models可多个
        component: () => import('../routes/film/hongKong'),
    }, 
    {
        id:'music',
        pid:'0',
        name:'App.menuMusic',
        icon:'sound',
        display:'block',
        path: '/music',
        models: () => [import('../models/music')], //models可多个
        component: () => import('../routes/music'),
    },
    {
        id:'music-edit',
        pid:'music',
        name:'App.menuMusic',
        icon:'sound',
        path: '/music/edit/:id?',
        models: () => [import('../models/music')], //models可多个
        component: () => import('../routes/music/edit'),
    },
    {
        id:'music-copy',
        pid:'music',
        name:'App.menuMusic',
        icon:'sound',
        path: '/music/copy/:id?',
        models: () => [import('../models/music')], //models可多个
        component: () => import('../routes/music/edit'),
    }
];

/**
 * 封装路由数据，利用id和pid的关联性处理
 */
const menuMap = (() => {
    let byId = OrderedMap();
    let byPid = OrderedMap();
    menuGlobal.map(item => {
      byId = byId.set(item.id, fromJS(item));
      byPid = byPid.update(item.pid, obj => obj ? obj.add(item.id) : OrderedSet([item.id]))
      
    });
    return OrderedMap({
        byId,
        byPid
    });
})();
  
export default {
    menuGlobal,
    menuMap
}
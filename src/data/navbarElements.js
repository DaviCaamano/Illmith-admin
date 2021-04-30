const news = {
    name: 'News',
    to: '/'
}

const users = {
    name: 'Users',
    to: '/users',
}

const articles = {
    name: 'Articles',
    to: '/articles',
}

const publicSite= {
    name: 'Public Site',
    to: process.env.REACT_APP_ENV === 'prod'? 'http://www.illmith.com': 'http://localhost:3000',
    external_same_page: true
}



const getElements = (admin) => {

    const items = [

    ]

    const adminItems = [
        news,
        users,
        articles,
        publicSite,
    ];
    if(admin){

        items.push.apply(items, adminItems);
    }
    return items.length === 0? [publicSite]: items
}
export default getElements;